import { axios } from '@utils/axios';

export const useFileUpload = (src: File) => {
    const form = new FormData();
    form.append('image', src);
    return axios.post('http://api.zoodiary.kro.kr:3000/api/v1/upload', form);
};
