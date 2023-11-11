import axios from 'axios';

export const useLogin = (user: string, password: string) => {
  return axios.post('http://158.247.242.22:3000/api/v1/login', {
    user,
    password,
  });
}

