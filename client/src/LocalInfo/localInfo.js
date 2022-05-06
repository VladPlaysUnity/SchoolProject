let localInfo = {
  loggedIn: true,
  loggedUserId: 0
}

export const setLoggedUserId = (user_id) => {
  localInfo.loggedUserId = user_id
  localInfo.loggedIn = true
  return localInfo.loggedUserId
}
export const quit = () =>{
  localInfo.loggedUserId = ''
  localInfo.loggedIn = false
  return localInfo.loggedIn
}

export const getLoggedInStatus = () => {
  return localInfo.loggedIn
}
export const getLoggedUserId = () => {
  return localInfo.loggedUserId
}
