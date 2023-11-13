import { axios } from '@utils/axios';

export const usePutProfile = ( picture: string) => {
    return axios.put(`http://api.zoodiary.kro.kr:3000/api/v1/profile`, {
        picture,
    });
};
