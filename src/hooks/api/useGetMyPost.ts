import { ky } from '@utils/ky';

export const useGetMyPost = (offset: number = 0, limit: number = 10) => {
    return ky.get(`http://api.zoodiary.kro.kr:3000/api/v1/post/mypage?limit=${limit}&offset=${offset}`).json();
};