import axiosClient from '../api/axios-client';

export const getUser = (id, options = {}) => {
    return axiosClient.get(`/users/${id}`, {
        params: options
    });
};

export const getUsers = (filters = {}, relationships = []) => {
    const params = {
        ...filters,
        include: relationships.join(',')
    };

    return axiosClient.get('/users', { params });
};

export const createUser = (payload) => {
    return axiosClient.post('/users', payload);
};

export const updateUser = (id, payload) => {
    return axiosClient.put(`/users/${id}`, payload);
};

export const deleteUser = (id) => {
    return axiosClient.delete(`/users/${id}`);
};
