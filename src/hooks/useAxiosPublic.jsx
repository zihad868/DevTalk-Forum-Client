import axios from 'axios'

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_LOCAl_API
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;