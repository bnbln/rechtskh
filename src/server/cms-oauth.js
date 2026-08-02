import { timingSafeEqual } from 'node:crypto'

export const OAUTH_COOKIE_NAME = 'rechtsklarheit_decap_oauth_state'

export function getRuntimeEnvironment() {
  return globalThis.process?.env || {}
}

export function getCmsSiteUrl() {
  const environment = getRuntimeEnvironment()

  return (environment.CMS_SITE_URL || environment.SITE_URL || 'https://rechtsklarheit.de').replace(
    /\/$/,
    ''
  )
}

export function getCookie(request, name) {
  const cookieHeader = request.headers.cookie || ''
  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : ''
}

export function oauthStateMatches(expected, received) {
  if (!expected || !received) return false

  const expectedBuffer = Buffer.from(expected)
  const receivedBuffer = Buffer.from(received)

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  )
}

export function oauthCookie(value, maxAge = 600) {
  return [
    `${OAUTH_COOKIE_NAME}=${encodeURIComponent(value)}`,
    'Path=/api/cms',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ].join('; ')
}

const safeJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

export function renderOauthResult(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CMS-Anmeldung</title>
  </head>
  <body>
    <p>Die CMS-Anmeldung wird abgeschlossen. Dieses Fenster kann anschließend geschlossen werden.</p>
    <script>
      (() => {
        const targetOrigin = window.location.origin;
        const result = ${safeJson(message)};

        const sendResult = (event) => {
          if (event.origin !== targetOrigin || !window.opener) return;
          window.opener.postMessage(result, targetOrigin);
        };

        window.addEventListener('message', sendResult, false);
        if (window.opener) {
          window.opener.postMessage('authorizing:github', targetOrigin);
        }
      })();
    </script>
  </body>
</html>`
}

export function sendOauthHtml(response, statusCode, status, payload) {
  response
    .status(statusCode)
    .set({
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy':
        "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    })
    .send(renderOauthResult(status, payload))
}
