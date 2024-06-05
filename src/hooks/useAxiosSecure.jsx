import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_LOCAl_API
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by intercept', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error){
        return Promise.reject(error);
    })

    // intercepts user
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptors', status);

        if(status === 401 || status === 403){
            await signOutUser()
            navigate('/')
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;