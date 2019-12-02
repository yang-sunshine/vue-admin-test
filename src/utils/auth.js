import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const certificateKey = 'sinostrong_certificate'
const companyCodeKey = 'sinostrong_companycode'
const personKey = 'sinostrong_person'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeCertificate() {
  return Cookies.remove(certificateKey)
}
export function setCertificate(certificate) {
  return Cookies.set(certificateKey, certificate)
}

export function getCertificate() {
  return Cookies.get(certificateKey)
}

export function removeCompanyCode() {
  return Cookies.remove(companyCodeKey)
}
export function setCompanyCode(companyCode) {
  return Cookies.set(companyCodeKey, companyCode)
}

export function getCompanyCode() {
  return Cookies.get(companyCodeKey)
}

export function removePerson() {
  return Cookies.remove(personKey)
}
export function setPerson(personId) {
  return Cookies.set(personKey, personId)
}

export function getPerson() {
  return Cookies.get(personKey)
}
