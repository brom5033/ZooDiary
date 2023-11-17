import { ky } from '@utils/ky';
import type { PostApi } from '@customType/objectRequest';

interface ResponseData {
    data: PostApi[];
    success: boolean;
}

export const useGetMyPost = (offset: number = 0, limit: number = 10) => {
    return ky
        .get(`http://api.zoodiary.kro.kr:3000/api/v1/post/mypage?limit=${limit}&offset=${offset}`)
        .json<ResponseData>();
};
