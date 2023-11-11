import { axios } from '@utils/axios';

export const useGetPost = (offset: number = 0, limit: number = 10) => {
    return axios.get(`http://158.247.242.22:3000/api/v1/post?limit=${limit}&offset=${offset}`);
};
