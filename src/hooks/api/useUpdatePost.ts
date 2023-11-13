import { axios } from '@utils/axios';

export const useUpdatePost = (id: number, content: string, picture?: string, chips?: string) => {
    return axios.put(`http://api.zoodiary.kro.kr:3000/api/v1/post/${id}`, {
        picture,
        content,
        chips,
    });
};
