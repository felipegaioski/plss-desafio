import axiosClient from "../api/axios-client.js";

export const getUnitCategories = (filters = {}, relationships = []) => {
    const params = {
        ...filters,
        relationships: relationships.join(',')
    };

    return axiosClient.get('/unit-categories', { params });
};

export const getUnitCategory = (id, params = {}) => {
    return axiosClient.get(`/unit-categories/${id}`, { params });
};

export const storeUnitCategory = (data) => {
    return axiosClient.post('/unit-categories', data);
};

export const updateUnitCategory = (id, data) => {
    return axiosClient.put(`/unit-categories/${id}`, data);
};

export const deleteUnitCategory = (id) => {
    return axiosClient.delete(`/unit-categories/${id}`);
};