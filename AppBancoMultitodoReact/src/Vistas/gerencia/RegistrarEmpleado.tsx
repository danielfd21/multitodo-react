import { useState } from "react";
import MenuGerencia from "../../Componentes/Gerencia/Menu";
import ComboboxDepartamentos from '../../Componentes/Gerencia/ComboboxDepartamentos';

function RegistrarEmpleados(){


    const [Cedula,setCedula] = useState('');
    const [Nombres,setNombres] = useState('');
    const [Apellidos,setApellidos] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Fecha_de_nacimento, setFecha] = useState('');
    const [Departamento, setDepartamento] = useState('');
    

    const [error, setError] = useState('');

    const [mensaje, setMensaje] = useState('');

   


    

    


    const handlerSubmit = async (e:React.FormEvent) =>{

        e.preventDefault();

        if(!Cedula || !Nombres || !Apellidos || !Correo || !Fecha_de_nacimento){

            setError("Por favor llene todos los campos");
            return; 

        }

        setError('');


        try{

            const response = await fetch("https://localhost:7103/gerencia/registrar",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                   
                },
                body: JSON.stringify({Cedula:Cedula, Nombres:Nombres, Apellidos:Apellidos, Correo:Correo, Fecha_de_nacimiento:Fecha_de_nacimento,departamento:Departamento})
            });

            if(!response.ok){

                const error_data = await response.text();
                setMensaje('');
                setError(error_data);



            }else{

                const data = await response.text();
                setError('');
                setMensaje(data);
                


            }



        }catch(err){
            console.log("Error fetch Registro" + err);
        }

    } 


    return(

        
        <form onSubmit={handlerSubmit}>
            <MenuGerencia/>
            <br />
            <br />
            <h1><label htmlFor="">Registrar Empleados</label></h1>
            <br />
            <br />
            <label htmlFor="">Cedula:</label>
            <input type="text" name="txt_ced" value={Cedula} onChange={ e=> setCedula(e.target.value)}/>
            <br />
            <br />
            <label htmlFor="">Nombres:</label>
            <input type="text" name="txt_nom" value={Nombres} onChange={e=> setNombres(e.target.value)}/>
            <br />
            <br />
            <label htmlFor="">Apellidos:</label>
            <input type="text" name="txt_ape"  value={Apellidos} onChange={ e=> setApellidos(e.target.value)}/>
            <br />
            <br />
            <label htmlFor="">Correo:</label>
            <input type="text" name="txt_cor" value={Correo} onChange={e=> setCorreo(e.target.value)} />
            <br />
            <br />
            <label htmlFor="">Fecha de nacimiento</label>
            <input type="date" name="txt_fec_nac" value={Fecha_de_nacimento} onChange={e=> setFecha(e.target.value)} />
            <br />
            <br />
            <label htmlFor="">Departamento:</label>
            <ComboboxDepartamentos Value={(e)=> setDepartamento(e.target.value)}/>
            <br />
            <br />
            <label htmlFor="">{error!=''?error:mensaje}</label>
            <br />
            <br />
            <input type="submit" value={'REGISTRAR EMPLEADO'} />

        </form>

     

    );

}


export default RegistrarEmpleados;