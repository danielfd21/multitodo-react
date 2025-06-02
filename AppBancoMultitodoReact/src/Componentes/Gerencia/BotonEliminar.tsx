interface Cedula{

    cedula:string;
}



function Eliminar({cedula}:Cedula){


    const Delete = async () =>{

        try{

            const response = await fetch(`https://localhost:7103/gerencia/eliminar-empleado/${cedula}`, {

                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }

            });

            if(!response.ok){

                const error_eliminar = await response.text();
                console.log("Respuesta correcta:", response.status);
                console.log("error" + error_eliminar);
            }else{

                
                alert("Empleado eliminado con exito");
            }

        }catch(err){
            
            console.log("error en eliminar" + err );
        }

    }


    return(

        <button type="button" onClick={Delete}>Eliminar</button>


    );


}


export default Eliminar;