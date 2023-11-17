import { ky } from '@utils/ky';

export const useHeart = (id: number) => {
    return ky.post(`http://api.zoodiary.kro.kr:3000/api/v1/heart/${id}`).json();
};
