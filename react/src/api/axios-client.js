// import axios from 'axios';

// const axiosClient = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

// axiosClient.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
//     return config;
// });

// axiosClient.interceptors.response.use((response) => {
//         return response;
//     }, (error) => {
//         const {response} = error;
//         if (response.status === 401) {
//             localStorage.removeItem('ACCESS_TOKEN');
//         }

//         throw error;
//     });

// export default axiosClient;

import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}

axiosClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/refresh`, {}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                        }
                    });

                    const newToken = response.data.token;
                    localStorage.setItem('ACCESS_TOKEN', newToken);
                    onRefreshed(newToken);
                } catch (err) {
                    localStorage.removeItem('ACCESS_TOKEN');
                    window.location.href = '/login';
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise(resolve => {
                refreshSubscribers.push(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosClient(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
