import axios from 'axios';

export const userSignUp = data => {
  return axios({
    url: 'http://svcy3.myclass.vn/api/Users/signup',
    method: 'POST',
    data,
  });
};

export const userLogin = data =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/signin',
    method: 'POST',
    data,
  });
