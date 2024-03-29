
import axios, { AxiosRequestConfig } from "axios";
import qs from 'qs';
import history from "./history";
import { getAuthData } from "./storge";


export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.React_APP_CLIENT_ID ?? 'dscatalog'; 
const CLIENT_SECRET = process.env.React_APP_CLIENT_SECRET ?? 'dscatalog123'; 

type LoginData = {
    username: string;
    password: string;
}


export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    }

    const data = qs.stringify({
        ...loginData,
        grant_type : 'password'
    });

    return axios({method: 'POST', baseURL: BASE_URL, url: '/oauth/token', data: data, headers});
}

export const requestBackend = (config: AxiosRequestConfig) => {
    const headers = config.withCredentials 
    ? {
        ...config.headers,
        Authorization : "Bearer " + getAuthData().access_token
    } : config.headers;
    return axios({...config, baseURL:BASE_URL, headers});
}



//adicionando uma requisição via interceptor
axios.interceptors.request.use(function (config){

    console.log('interceptor antes da requisição');
    return config;

}, function error(){
    console.log('INTERCEPTOR ERRO NA REQUISÇÃO');
    return Promise.reject(error);
});


//fazendo redidiricionando fora dos componentes react e necessário criar um componente externo

// adicionando a resposta do interceptador
axios.interceptors.response.use(function (response){
    // Inserimos aqui a logica em caso de sucesso  na faixa dos 200 e nesse caso será direcionado para
    // usar esta resposta

    console.log('INTERCEPTOR RESPOSTA COM SUCESSO!!');

    return response;
}, function (error){

    // estamos nesse momento verificando se os usuarios estão autenticados  caso não estejam autorizados os mesmos
    //serão redicionando para a pagina de login. Para isso utilizarewsmos um arquivo history.ts para auxiliar. Ima vez
    // que este arquivo ** request.ts** não é um componente react
    if( error.response.status === 401 ){
        history.push('/admin/auth')
    }
    console.log('INTERCEPTOR RESPOSTA COM ERRO');

    return Promise.reject(error);
});



