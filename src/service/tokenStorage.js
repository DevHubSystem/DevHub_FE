/**
 * JWT persistence helpers. Token is stored in localStorage with a 7-day expiry
 * (FR-1.x). Reads transparently drop the token once it has expired.
 */
const TOKEN_KEY = 'devhub_token'
const EXPIRY_DAYS = 7
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000

/** Remove the stored token. */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/** Persist a token, stamping it with a 7-day expiry. */
export const setToken = (token) => {
  const expiresAt = Date.now() + EXPIRY_MS
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiresAt }))
}

/** Return the stored token, or null if missing/expired/corrupt. */
export const getToken = () => {
  const raw = localStorage.getItem(TOKEN_KEY)
  if (!raw) return null

  try {
    const { token, expiresAt } = JSON.parse(raw)
    if (!token || Date.now() > expiresAt) {
      clearToken()
      return null
    }
    return token
  } catch {
    clearToken()
    return null
  }
}
