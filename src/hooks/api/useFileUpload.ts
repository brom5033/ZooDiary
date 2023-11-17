import { ky } from '@utils/ky';

export const useFileUpload = (src: File) => {
    const form = new FormData();
    form.append('image', src);
    return ky.post('http://api.zoodiary.kro.kr:3000/api/v1/upload', { body: form }).json();
};
