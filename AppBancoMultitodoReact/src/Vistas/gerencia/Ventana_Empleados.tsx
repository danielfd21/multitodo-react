import { useState } from 'react';
import TablaEmpleados from '../../Componentes/Gerencia/TablaEmpleados';
import EnviarActualizar from '../../Componentes/Gerencia/BotonEnviarActualizar';
import Eliminar from '../../Componentes/Gerencia/BotonEliminar';
import MenuGerencia from '../../Componentes/Gerencia/Menu';



function VentanaEmpleados(){

    const [cedula, setCedula] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [error, setError] = useState('');
    const [Empleados, setEmpleados] = useState([]);
    
    
    
    const  Buscar = async () => {

        if(!cedula && !apellidos){

            setError('Por lo menos debe ingresar un campo de busqueda');
            return;
            
        }

        if(cedula && !apellidos){

            const response = await fetch(`https://localhost:7103/gerencia/filtrar-empleados-cedula/${cedula}`,{

                method: 'POST',
                headers:{

                    'Content-Type':'application/json'
                }
                

            });

            if(!response.ok){

                const error_mostrar_cedula = await response.text();
                setError(error_mostrar_cedula);
                console.log("error" + error);

            }else{

                const data = await response.json();
                console.log(data);
                setEmpleados(data);
                console.log("Empleados" + Empleados);
                setError('');

            }

            return;
        }

        if(!cedula && apellidos){
              const response = await fetch(`https://localhost:7103/gerencia/filtrar-empleados-apellidos/${apellidos}`,{

                method: 'POST',
                headers:{

                    'Content-Type':'application/json'
                }
                

            });

            if(!response.ok){

                const error_mostrar_apellidos = await response.text();
                setError(error_mostrar_apellidos);
                console.log(error);

            }else{

                const data = await response.json();
                console.log(data);
                setEmpleados(data);
                setError('');

            }

            return;
        }

        
        if(cedula && apellidos){
              const response = await fetch(`https://localhost:7103/gerencia/filtrar-empleados-cedula/${cedula}`,{

                method: 'POST',
                headers:{

                    'Content-Type':'application/json'
                }
                

            });

            if(!response.ok){

                const error_mostrar_cedula = await response.text();
                setError(error_mostrar_cedula);
                console.log("error" + error);
            }else{

                const data = await response.json();
                setEmpleados(data);
                setError('');

            }

            return;
        }

        



    }


    return(

        <>
            <MenuGerencia/>

            <h1>Editar Empleados</h1>
            <br />
            <br />
            <form>
                
                <label htmlFor="">Cedula:</label>
                <input type="text" name="txt_ced" id="tx_ce" onChange={e=> (setCedula(e.target.value))}/>
                <label htmlFor="">o</label>
                &nbsp;&nbsp;
                <label htmlFor="">Apellidos:</label>
                <input type="text" name="txt_ape" id="tx_ap"  onChange={e=> (setApellidos(e.target.value))} />
                <br />
                <br />
                <button type='button' onClick={Buscar}>Buscar</button>
                <br />
                <br />
                <label htmlFor="">{error}</label>
                <br />
                <br />
                <TablaEmpleados filas={Empleados} boton_actualizar={(cedula,correo) => <EnviarActualizar cedula={cedula} correo={correo} />}  boton_eliminar={(cedula) => <Eliminar cedula={cedula}/>}/>
                <br />
                <br />
                        
                
                
                


            </form>

        </>

    );


}


export default VentanaEmpleados;