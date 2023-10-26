import axios from 'axios';
// hooks
import { useLocalStorage } from '@hooks/useLocalStorage';

const [token] = useLocalStorage('token');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(async (request) => {
    if (token) {
        request.headers.Authorization = `Bearer ${token()}`;
    }

    return request;
});

export {instance as axios}