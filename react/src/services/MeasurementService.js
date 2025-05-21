import axiosClient from "../api/axios-client.js";

export const getMeasurements = (filters = {}, relationships = []) => {
    const params = {
        ...filters,
        relationships: relationships.join(',')
    };
    return axiosClient.get('/measurements', { params });
};

export const getMeasurement = (id, params = {}) => {
    return axiosClient.get(`/measurements/find/${id}`, { params });
};

export const storeMeasurement = (data) => {
    return axiosClient.post('/measurements', data);
};

export const updateMeasurement = (id, data) => {
    return axiosClient.put(`/measurements/${id}`, data);
};

export const deleteMeasurement = (id) => {
    return axiosClient.delete(`/measurements/${id}`);
};