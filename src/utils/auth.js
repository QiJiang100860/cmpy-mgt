import Cookies from 'js-cookie'


const UserInfro = "userInfro"
const HasInfro = "hasInfro"


export const getUserInfro = () => {
  return Cookies.get(UserInfro)
}

export const setUserInfro = (data) => {
  return Cookies.set(UserInfro, data)
}

export const removeUserInfro = () => {
  return Cookies.remove(UserInfro)
}


export const getHasInfro = () => {
  return Cookies.get(HasInfro)
}

export const setHasInfro = (data) => {
  return Cookies.set(HasInfro, data)
}

export const removeHasInfro = () => {
  return Cookies.remove(HasInfro)
}
