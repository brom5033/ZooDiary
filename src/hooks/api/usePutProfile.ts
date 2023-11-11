import { axios } from '@utils/axios';

export const usePutProfile = ( picture: string) => {
    return axios.put(`http://158.247.242.22:3000/api/v1/profile`, {
        picture,
    });
};
