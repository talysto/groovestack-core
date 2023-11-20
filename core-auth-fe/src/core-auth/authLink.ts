import { setContext } from '@apollo/client/link/context';

import { defaultCredentials } from './credentials'

const getCookie = (cookieName: string) => {
  const cookies: { [key: string]: string } = {}
  document.cookie.split('; ').forEach((cookie) => {
    const [key, value] = cookie.split('=')
    cookies[key] = value
  })
  return cookies[cookieName] || null
}

const decodeCookie = (cookie: string | null): any => {
  // decodes signed, json encoded rails cookies

  if (!cookie) return null

  let cookie_value = unescape(cookie.split('--')[0])
  // let cookie_payload = JSON.parse(atob(cookie_value))
  // console.log('cookie_payload', cookie_payload)
  // let decoded_stored_value = atob(cookie_payload._rails.message)
  // let stored_value = JSON.parse(decoded_stored_value)
  // return stored_value

  return JSON.parse(cookie_value)
}

export const authLink = setContext((_, { headers }) => {
  const authCookie = getCookie('auth_cookie')

  if (authCookie) {
    const { Authorization, ...authCredentials } = decodeCookie(authCookie)
    defaultCredentials.setAuthHeaders(authCredentials)
  }

  const authCredentials = defaultCredentials.getAuthHeaders()

  return {
    headers: {
      ...headers,
      ...(authCredentials)
    }
  }
});