const sessionKey = 'xtra-token';
export const baseURL = 'https://api.norahealth.ai/api/v1';
export const baseURLSocket = 'ws://localhost:3001/websocket';
export const appId = 'c3684fde-0c75-4878-96a7-440090fc84b7'
 const getUserToken = () => {
  let userData = JSON.parse(localStorage.getItem(sessionKey))
  return userData ? userData.token: null;
};
// to keep the API call simple, I have used plain email id as the bearer token for API call verification
export const getHeader = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };
};
export const updateLoggedInData = (data) => {
  console.log('data is ', data)
  localStorage.setItem(sessionKey, JSON.stringify(data));
};

export const getLoggedInUserDetails = (data) => {
  return JSON.parse(localStorage.getItem(sessionKey));
};
export const getUserType = (data) => {
  let userData = JSON.parse(localStorage.getItem(sessionKey))
  return userData ? userData.userType: null;
};
export const handleLogOut  = () =>{
  localStorage.removeItem(sessionKey);
  return ;
}
