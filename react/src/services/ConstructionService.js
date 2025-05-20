import axiosClient from '../api/axios-client';

export const getConstruction = (id, options = {}) => {
    return axiosClient.get(`/constructions/${id}`, {
        params: options
    });
};

export const getConstructions = (filters = {}, relationships = [], sort = []) => {
    const params = {
        ...filters,
        relationships: relationships.join(','),
        sort: sort.join(','),
    };

    return axiosClient.get('/constructions', { params });
};

export const storeConstruction = (payload) => {
    return axiosClient.post('/constructions', payload);
};

export const updateConstruction = (id, payload) => {
    return axiosClient.put(`/constructions/${id}`, payload);
};

export const deleteConstruction = (id) => {
    return axiosClient.delete(`/constructions/${id}`);
};
