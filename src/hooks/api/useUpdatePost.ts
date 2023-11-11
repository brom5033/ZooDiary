import { axios } from '@utils/axios';

export const useUpdatePost = (id: number, content: string, picture?: string, chips?: string) => {
    return axios.put(`http://158.247.242.22:3000/api/v1/post/${id}`, {
        picture,
        content,
        chips,
    });
};
