import { randomBytes } from 'node:crypto'
import { getCmsSiteUrl, getRuntimeEnvironment, oauthCookie } from '../../server/cms-oauth'

export default function handler(request, response) {
  const clientId = getRuntimeEnvironment().CMS_GITHUB_CLIENT_ID

  if (!clientId) {
    response.status(500).json({ error: 'CMS_GITHUB_CLIENT_ID ist nicht konfiguriert.' })
    return
  }

  if (request.query.provider && request.query.provider !== 'github') {
    response.status(400).json({ error: 'Nur GitHub OAuth wird unterstützt.' })
    return
  }

  const siteUrl = getCmsSiteUrl()
  const state = randomBytes(32).toString('hex')
  const requestedScope = Array.isArray(request.query.scope)
    ? request.query.scope[0]
    : request.query.scope
  const scope = requestedScope === 'public_repo' ? 'public_repo' : 'repo'
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')

  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', `${siteUrl}/api/cms/callback`)
  authorizeUrl.searchParams.set('scope', scope)
  authorizeUrl.searchParams.set('state', state)

  response.set({
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'Set-Cookie': oauthCookie(state),
  })
  response.redirect(302, authorizeUrl.toString())
}
