import axios from 'axios';
import { BASE_URL } from '../config';
import { store } from '../store';
import { Logout } from '../store/reducers/auth';
import alert from '../store/reducers/alert';
import toast from 'react-hot-toast';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
    (config) => {
        config.baseURL = BASE_URL;
        const state = store.getState();
        const accessToken = state.auth.token;
        if (accessToken) {
            config.headers.authorization = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { response } = error;
        if (response && response.status === 400) {
            toast.error(response.data, 'error');
        } else if (response && response.status === 401) {
            store.dispatch(Logout({}));
        } else if (response && response.status === 413) {
            toast.error(response.data, 'error');
        } else if (response && response.status === 429) {
            toast.error(response.data, 'error');
        } else {
            console.log(response);
        }
        return Promise.reject(error);
    }
);

export default axiosServices;
