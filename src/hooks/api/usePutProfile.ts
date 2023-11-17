import { ky } from '@utils/ky';

export const usePutProfile = (picture: string) => {
    return ky.put(`http://api.zoodiary.kro.kr:3000/api/v1/profile`, {
        json: {
            picture,
        },
    }).json();
};
