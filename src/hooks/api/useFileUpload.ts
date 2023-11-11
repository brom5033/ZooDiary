import { axios } from '@utils/axios';

export const useFileUpload = (src: File) => {
    const form = new FormData();
    form.append('image', src);
    return axios.post('http://158.247.242.22:3000/api/v1/upload', form);
};
