import axios from 'axios';
// hooks
import { useLocalStorage } from '@hooks/index';

const [token] = useLocalStorage('token');

const instance = axios.create({
    baseURL: 'http://158.247.242.22:3000',
});

instance.interceptors.request.use(async (request) => {
    if (token) {
        request.headers.Authorization = `Bearer ${token()}`;
    }

    return request;
});

export { instance as axios };
