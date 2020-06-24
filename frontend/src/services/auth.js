import api from './api';

export const autenticado = () => {
    const JWT = api.get(`autenticacao`, {
        headers: {
            authorization: "Bearer " + localStorage.getItem('JWT'),
        }
    })
    console.log(JWT);

};