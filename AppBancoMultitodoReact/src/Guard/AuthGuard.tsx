import React from "react";
import { Navigate } from "react-router-dom";
import type { JWTModel } from '../Modelos/JWTModel';
import { jwtDecode } from "jwt-decode";

interface Props{

        children: React.ReactNode;
    }


function AuthGuard({children}:Props){

    
    const token = localStorage.getItem("token");


    function TokenExpirado(tok:string){
        
        try{

        const decoded = jwtDecode<JWTModel>(tok);
        const current_time = Date.now() / 1000;
        
        if(decoded.exp < current_time){

            localStorage.removeItem("token");
            return true;
        }

        return false;

    }catch(err){
        console.log("error jwt" + err);
        return true;
    }

    }

    
    if(!token  || TokenExpirado(token)){

        alert("Su sesión ha expirado vuelva a ingresar por favor");
        
        return <Navigate to={"/"}></Navigate>
    }

    return <>{children}</>


}

export default AuthGuard;