import { useState } from "react";

    interface prop{
        id: string;
    }

function BtnMostrar({id}:prop){

    const [boton, setBoton] = useState("Mostrar");

    const CambiarEstadoBoton = () =>{

        const passwordfield = document.getElementById(id) as HTMLInputElement;

        if(passwordfield.type == "password"){

            passwordfield.type = "text";
            setBoton("Ocultar");
        }else{

            passwordfield.type = "password";
            setBoton("Mostrar");

        }
        

    }


    return(

        <button onClick={CambiarEstadoBoton}>{boton}</button>
    )


}

export default BtnMostrar;