import { axios } from '@utils/axios';

export const usePostWrite = (picture: string, content: string, chips: string) => {
    return axios.post('http://158.247.242.22:3000/api/v1/post', {
        picture,
        content,
        chips,
    });
};
