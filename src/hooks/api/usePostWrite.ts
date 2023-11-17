import { ky } from '@utils/ky';

export const usePostWrite = (picture: string, content: string, chips: string) => {
    return ky.post('http://api.zoodiary.kro.kr:3000/api/v1/post', {
        json: {
            picture,
            content,
            chips,
        },
    }).json();
};
