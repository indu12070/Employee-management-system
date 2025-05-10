import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (email, password) =>
        api.post('/auth/signin', { email, password }),
    register: (firstName, lastName, email, password) =>
        api.post('/auth/signup', { firstName, lastName, email, password }),
};

export const employeeService = {
    getAll: () => api.get('/employees'),
    getById: (id) => api.get(`/employees/${id}`),
    create: (data) => api.post('/employees', data),
    update: (id, data) => api.put(`/employees/${id}`, data),
    delete: (id) => api.delete(`/employees/${id}`),
};

export const departmentService = {
    getAll: () => api.get('/departments'),
    getById: (id) => api.get(`/departments/${id}`),
    create: (data) => api.post('/departments', data),
    update: (id, data) => api.put(`/departments/${id}`, data),
    delete: (id) => api.delete(`/departments/${id}`),
};

export const payrollService = {
    getAll: () => api.get('/payrolls'),
    getById: (id) => api.get(`/payrolls/${id}`),
    create: (data) => api.post('/payrolls', data),
    update: (id, data) => api.put(`/payrolls/${id}`, data),
    delete: (id) => api.delete(`/payrolls/${id}`),
}; 