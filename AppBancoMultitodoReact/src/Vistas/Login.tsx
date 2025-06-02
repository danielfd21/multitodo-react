import { useState } from "react"
import { useNavigate } from "react-router-dom";



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

            const response = await fetch("https://localhost:7103/autentificacion/Acceso", {

                method: "POST",
                headers: {

                    "Content-type":"application/json"
                },

                body: JSON.stringify({Cedula: Usuario,Clave: Clave})
                


            });

            if(!response.ok){

                const error_data = await response.text();
                setError(error_data);
                return;

            }

            const data = await response.text();
            
            switch(data){
                case "Gerencia": return Navigate("http://localhost:5173/Gerencia") ;
                case "Contabilidad": return Navigate("http://localhost:5173/Contabilidad");
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
            <input type="text" name="txt_cla"  value={Clave} onChange={e => setClave(e.target.value)}/>
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