import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
    // baseURL: `https://bistro-boss-server-sandy-alpha.vercel.app`
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        // console.log("request stopped by interceptors", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    // intercepts 401 and 403 status
    //  Add a response interceptor
    axiosSecure.interceptors.response.use((response) => {

        return response;

    }, async (error) => {

        const status = error.response.status;
        // console.log("Status error in the interceptors", status);
        if (status === 401 || status === 403) {
            await logOut()
                .then(() => { })
                .catch(err => console.log(err))
            navigate('/login');
        }

        return Promise.reject(error);
    });


    return axiosSecure;
};

export default useAxiosSecure;