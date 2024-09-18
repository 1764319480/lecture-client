import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000/',
    timeout: 2000
    
})
instance.interceptors.request.use(function (config) {
    // console.log(config)
    const token = sessionStorage.getItem('token') || sessionStorage.getItem('supertoken'); 
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
export default instance