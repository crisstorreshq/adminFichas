const axios = window.axios;

axios.defaults.withCredentials = true; // Habilita cookies en solicitudes
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default {
    logout: () => axios.post(`/api/logout`, {}, {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
    }),
    getListFichas: () => 
        axios.get('/api/listadoDeFichas'),
    getFichaPdf: (id) => 
        axios.get(`/vistaficha/${id}`, { responseType: 'blob' }),
    getListPacientes: (search = '', page = 1, perPage = 10) => 
        axios.get(`/api/pacientes`, {
            params: {
                search,
                page,
                per_page: perPage, // Se agrega el parámetro per_page
            }
        }),
    postCreateFicha: data => 
        axios.post('asignar-ficha', data),

    postDigitalizarFicha: (pacienteId, file) => {
        const formData = new FormData();
        formData.append('paciente_id', pacienteId);
        formData.append('ficha', file);

        return axios.post('/api/digitalizar-ficha', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    postAgregarPdfFicha: (pacienteId, file) => {
        const formData = new FormData();
        formData.append('paciente_id', pacienteId);
        formData.append('ficha', file);
    
        return axios.post('/api/agregar-pdf-ficha', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
