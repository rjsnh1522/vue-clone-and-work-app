
import axios from 'axios'

export const BASE_URL = '//localhost:8000/'
export const APP_URL = "http://localhost:8080/"

var headers = {
  'Content-Type': 'application/json'
}
let user_token = localStorage.getItem('user-token');

if (user_token) {
  headers['Authorization'] = 'JWT ' + user_token;
}

export const http = axios.create({
  baseURL: BASE_URL,
  headers: headers
});

export default http



export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

