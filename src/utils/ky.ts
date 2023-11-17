import ky from 'ky';
// hooks
import { useLocalStorage } from '@hooks/index';

const [token] = useLocalStorage('token');

const instance = ky.create({
    headers: {
        Authorization: `Bearer ${token()}`,
    },
    retry: {
        limit: 10,
        methods: ['get', 'post', 'put', 'delete'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
});

export { instance as ky };
