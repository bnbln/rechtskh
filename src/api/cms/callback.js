import {
  getCmsSiteUrl,
  getCookie,
  getRuntimeEnvironment,
  OAUTH_COOKIE_NAME,
  oauthCookie,
  oauthStateMatches,
  sendOauthHtml,
} from '../../server/cms-oauth'

const queryValue = (value) => (Array.isArray(value) ? value[0] : value)

export default async function handler(request, response) {
  const code = queryValue(request.query.code)
  const state = queryValue(request.query.state)
  const oauthError = queryValue(request.query.error_description || request.query.error)
  const cookieState = getCookie(request, OAUTH_COOKIE_NAME)

  response.set('Set-Cookie', oauthCookie('', 0))

  if (oauthError) {
    sendOauthHtml(response, 401, 'error', { message: oauthError })
    return
  }

  if (!code || !oauthStateMatches(cookieState, state)) {
    sendOauthHtml(response, 400, 'error', {
      message: 'Die OAuth-Anfrage ist ungültig oder abgelaufen. Bitte erneut anmelden.',
    })
    return
  }

  const environment = getRuntimeEnvironment()
  const clientId = environment.CMS_GITHUB_CLIENT_ID
  const clientSecret = environment.CMS_GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    sendOauthHtml(response, 500, 'error', {
      message: 'Die GitHub-OAuth-Zugangsdaten sind nicht vollständig konfiguriert.',
    })
    return
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'rechtsklarheit-decap-oauth',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${getCmsSiteUrl()}/api/cms/callback`,
        state,
      }).toString(),
    })
    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
      sendOauthHtml(response, 401, 'error', {
        message: tokenData.error_description || tokenData.error || 'GitHub-Anmeldung fehlgeschlagen.',
      })
      return
    }

    sendOauthHtml(response, 200, 'success', {
      token: tokenData.access_token,
      provider: 'github',
    })
  } catch (error) {
    console.error('GitHub OAuth token exchange failed:', error)
    sendOauthHtml(response, 502, 'error', {
      message: 'GitHub ist momentan nicht erreichbar. Bitte versuchen Sie es später erneut.',
    })
  }
}
