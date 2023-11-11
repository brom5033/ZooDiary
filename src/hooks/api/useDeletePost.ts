import { axios } from '@utils/axios';

export const useDeletePost = (id: number) => {
    return axios.delete(`http://158.247.242.22:3000/api/v1/post/${id}`);
};