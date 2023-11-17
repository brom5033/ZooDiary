import { ky } from '@utils/ky';

export const useUpdatePost = (id: number, content: string, picture?: string, chips?: string) => {
    return ky.put(`http://api.zoodiary.kro.kr:3000/api/v1/post/${id}`, {
        json: {
            picture,
            content,
            chips,
        },
    }).json();
};
