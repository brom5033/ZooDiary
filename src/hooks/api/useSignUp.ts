import axios from 'axios';

export const useSignUp = (user: string, password: string, nickName: string) => {
  return axios.post('http://localhost:3000/api/v1/signup', {
    user,
    password,
    nickName,
  });
}
