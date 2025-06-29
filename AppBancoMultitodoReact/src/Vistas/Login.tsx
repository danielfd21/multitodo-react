import { useState } from "react"
import { useNavigate } from "react-router-dom";
import BtnMostrar from '../Componentes/Gerencia/Boton/BotoMostrar';



function Login(){

    const [Usuario, setUsuario] = useState('');
    const [Clave, setClave] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate(); 
    
    const handleSubmit = async (e: React.FormEvent) =>{

        e.preventDefault();

        if(!Usuario.trim() || !Clave.trim()){

            setError("Por favor llene todos los campos");
            return;
        }

        setError('');


        try{

                const response = await fetch(`https://localhost:7154/autentificacion/login?cedula=${Usuario}&clave=${Clave}`, {
                method: "POST",
                headers: {

                    "Content-type":"application/json"
                }
                


            });

            if(!response.ok){

                const error_data = await response.text();
                setError(error_data);
                return;

            }

            const data = await response.json();
            
            localStorage.setItem("token",data.token);

            switch(data.departamento){
                case "Gerencia": return Navigate("/gerencia") ;
                default: setError(data);
            }
            

        }catch(err){
            console.log("error al hacer fetch" + err);
        }
    }


    return(

       <form onSubmit={handleSubmit}>

            <label htmlFor="">Usuario:</label> 
            <input type="text" name="txt_usu"  value={Usuario} onChange={e => setUsuario(e.target.value)}/>
            <br />
            <br />

            <label htmlFor="">Clave:</label>
            <input type="password" name="txt_cla" id="txt_cla" value={Clave} onChange={e => setClave(e.target.value)}/> <BtnMostrar id="txt_cla"/>
            <br />
            <br />

            <p>{error}</p>

            <input type="submit"  value={"Iniciar Cesión"}/>

            <br />
            <br />

            


       </form>
    )



}
export default Login