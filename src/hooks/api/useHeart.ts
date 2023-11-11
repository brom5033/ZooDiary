import { axios } from '@utils/axios';

export const useHeart = (id: number) => {
    return axios.post(`http://158.247.242.22:3000/api/v1/heart/${id}`);
};
