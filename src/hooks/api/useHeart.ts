import { axios } from '@utils/axios';

export const useHeart = (id: number) => {
    return axios.post(`http://localhost:3000/api/v1/heart/${id}`);
};
