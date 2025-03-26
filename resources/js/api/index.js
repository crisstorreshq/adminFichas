const axios = window.axios;

axios.defaults.withCredentials = true; // Habilita cookies en solicitudes
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default {
    logout: () => axios.post(`/api/logout`, {}, {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    }),
    getAuth: () => axios.get('/api/getAuth'),
};
