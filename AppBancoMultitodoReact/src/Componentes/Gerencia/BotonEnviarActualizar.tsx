import { useNavigate } from 'react-router-dom';

interface Datos{

    cedula:string;
    correo:string;
}


function EnviarActualizar({cedula,correo}:Datos){

    const navigate = useNavigate();
    
    const Enviar = () =>{
        
        navigate('/actualizar-empleados',{state: {cedula , correo}}); 

    }

    return(
        <button type='button' onClick={Enviar}>Actualizar</button>

    );

}


export default EnviarActualizar;