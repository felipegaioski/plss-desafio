import axiosClient from '../api/axios-client';

export const getAudits = (filters = {}, relationships = [], sort = []) => {
    const params = {
        ...filters,
        relationships: relationships.join(','),
        sort: sort.join(','),
    };

    return axiosClient.get('/audits', { params });
};
