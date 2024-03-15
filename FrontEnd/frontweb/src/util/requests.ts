
import axios, { AxiosRequestConfig } from "axios";
import qs from 'qs';
import history from "./history";
import jwtDecode from "jwt-decode";

// verificando a validade do token ..podemos verificar as informações do token a partir
// do site jwt.io
type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
    exp: number;
    user_name : string;
    authorities : Role[]
}

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId:number;
}

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
const tokenKey = 'authData';

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

export const saveAuthData = (obj : LoginResponse ) => {
    localStorage.setItem(tokenKey, JSON.stringify(obj));
}

export const getAuthData = () => {
    const str  = localStorage.getItem(tokenKey) ?? "{}";
    return JSON.parse(str) as LoginResponse;
     
}

export const removeAuthData = () =>{
    localStorage.removeItem(tokenKey);
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
    if( error.response.status === 401 || error.response.status === 403){
        history.push('/admin/auth')
    }
    console.log('INTERCEPTOR RESPOSTA COM ERRO');

    return Promise.reject(error);
});

export const getTokenData = (): TokenData | undefined => {

    //O token e caputurado do localstorege da maquina.. sempre


    const LoginResponse = getAuthData();

    try{
        return jwtDecode(LoginResponse.access_token) as TokenData;
    }
    catch(error){
        return undefined;
    }
   
}

export const isAuthenticated = () : boolean => {
    const tokenData = getTokenData();
    return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
};

export const hasAnyRoles = (roles : Role[] ): boolean =>{

    if(roles.length === 0){
        return true;
    }

    const tokenData = getTokenData();

    if(tokenData !== undefined){
        for(var i = 0; i < roles.length; i++){
            if(tokenData.authorities.includes(roles[i])){
                return true;
            }
        }
        
    }
    return false 
}