import { axios } from '@utils/axios';

export const useHeart = (id: number) => {
    return axios.post(`http://api.zoodiary.kro.kr:3000/api/v1/heart/${id}`);
};
