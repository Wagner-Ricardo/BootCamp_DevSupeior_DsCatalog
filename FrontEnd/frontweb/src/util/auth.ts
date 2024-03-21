
import jwtDecode from "jwt-decode";
import { getAuthData } from "./storge";

// verificando a validade do token ..podemos verificar as informações do token a partir
// do site jwt.io
export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
    exp: number;
    user_name : string;
    authorities : Role[]
}

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