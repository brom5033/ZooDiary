import { axios } from '@utils/axios';

export const useDeletePost = (id: number) => {
    return axios.delete(`http://localhost:3000/api/v1/post/${id}`);
};