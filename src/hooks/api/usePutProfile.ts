import { axios } from '@utils/axios';

export const usePutProfile = ( picture: string) => {
    return axios.put(`http://localhost:3000/api/v1/profile`, {
        picture,
    });
};
