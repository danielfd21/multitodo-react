import { useState } from 'react';
import MenuGerencia from '../../Componentes/Gerencia/Menu';
function ActualizarClave(){



    const [cedula,setCedula] = useState('');
    const [clave,setClave] = useState('');
    const [error,setError] = useState('');

    const handlerSubmit  = async (e:React.FormEvent) =>{

            e.preventDefault();
            
            
            if(!cedula){
                setError('Por favor ingrese el campo de cedula');
                return;
            }
            
            try{
                const response = await fetch(`https://localhost:7103/gerencia/actualizar-clave/${cedula}`,{

                method: "PUT",
                headers:{
                    'Content-Type':'application/json'
                },

                body: JSON.stringify({Cedula:cedula})
                

            });


            if(!response.ok){


                const error_actualizar_clave = await response.text();
                setError(error_actualizar_clave);
                setClave('');
                console.log("cedula:" + cedula);
            }else{

                const clave_actualizada = await response.text();
                setError('');
                setClave(clave_actualizada);

            }

            }catch(err){
                console.log("error fetch" + err);   
            }

            

    }



    return(


        <>

            <MenuGerencia/>

            <form onSubmit={handlerSubmit}>

            <h1>Actualizar Clave</h1>
            <br />
            <br />
            <label htmlFor="">Cedula:</label>
            <input type="text" name="txt_ced" id="tx_ce" onChange={ e=> setCedula(e.target.value)}/>
            <br />
            <br />
            <textarea name="txt_cla" id="tx_cl" rows={4} cols={50} value={clave} readOnly></textarea>
            <br />
            <br />
            <label htmlFor="">{error}</label>
            <br />
            <br />
            <input type="submit" name="btn_actualizar_clave" />
            </form>


        </>



    );





}


export default ActualizarClave;