import axiosClient from "../api/axios-client.js";

export const getUnits = (filters = {}, relationships = []) => {
    const params = {
        ...filters,
        relationships: relationships.join(',')
    };

    return axiosClient.get('/units', { params });
};

export const getUnit = (id, params = {}) => {
    return axiosClient.get(`/units/${id}`, { params });
};

export const storeUnit = (data) => {
    return axiosClient.post('/units', data);
};

export const updateUnit = (id, data) => {
    return axiosClient.put(`/units/${id}`, data);
};

export const deleteUnit = (id) => {
    return axiosClient.delete(`/units/${id}`);
};