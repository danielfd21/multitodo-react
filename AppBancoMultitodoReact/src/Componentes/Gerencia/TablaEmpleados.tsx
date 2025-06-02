import type React from "react";


    interface Empleados{

        cedula: string,
        nombres: string,
        apellidos: string,
        correo: string,
        fecha_de_nacimiento: string,
        departamento:{
            nombre: string,
            jefe: {
                nombres: string,
            }

        }


    }



    interface props{

        
        filas: Empleados[];
        boton_actualizar?: (cedula: string, correo:string) => React.ReactNode;
        boton_eliminar?: (cedula: string) => React.ReactNode;

    }

    


function TablaEmpleados({filas, boton_actualizar, boton_eliminar}:props){


    return(

        <table border={2}>
            <thead>
                   
                <tr>
                   
                    <th>Cedula</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Fecha de nacimiento</th>
                    <th>Departamento</th>
                    <th>Jefe de departamento</th>
                    { boton_actualizar &&  <th>Actualizar</th>}
                    {boton_eliminar && <th>Eliminar</th>}
                </tr>
            </thead>
            <tbody>

                {filas.map((fil,id_fil) => (
                    <tr key={id_fil}>
                        
                        <td>{fil.cedula}</td>
                        <td>{fil.nombres}</td>
                        <td>{fil.apellidos}</td>
                        <td>{fil.correo}</td>
                        <td>{fil.fecha_de_nacimiento}</td>
                        <td>{fil.departamento?.nombre ?? "Sin jefe"}</td>
                        <td>{fil.departamento?.jefe?.nombres ?? "Sin jefe"}</td>   
                        {boton_actualizar && <td>{boton_actualizar(fil.cedula, fil.correo)}</td>}
                        {boton_eliminar && <td>{boton_eliminar(fil.cedula)}</td>}
                    </tr>

                ))}
                                
                
            </tbody>
            

            



        </table>


    )

}

export default TablaEmpleados;