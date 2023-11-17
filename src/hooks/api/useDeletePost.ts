import { ky } from '@utils/ky';

interface Response {
    success: boolean;
    message: string;
}

export const useDeletePost = (id: number) => {
    return ky.delete(`http://api.zoodiary.kro.kr:3000/api/v1/post/${id}`).json<Response>();
};
