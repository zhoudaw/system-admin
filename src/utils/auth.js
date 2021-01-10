const Token = 'token'

export function getToken() {
  return sessionStorage.getItem(Token)
}
export function setToken(token) {
  return sessionStorage.setItem(Token, token)
}