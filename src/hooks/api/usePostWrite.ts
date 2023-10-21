import { axios } from '@utils/axios';

export const usePostWrite = (picture: string, content: string, chips: string) => {
    return axios.post('http://localhost:3000/api/v1/post', {
        picture,
        content,
        chips,
    });
};
