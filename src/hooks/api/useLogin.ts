import axios from 'axios';

export const useLogin = (user: string, password: string) => {
  return axios.post('http://api.zoodiary.kro.kr:3000/api/v1/login', {
    user,
    password,
  });
}

