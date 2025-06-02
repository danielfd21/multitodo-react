import { useEffect , useState } from "react";


interface props{
    SelectedValue: string;
    Value: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function ComboboxDepartamentos({SelectedValue,Value}:props){

     const [Array_Departamento, setArrayDepartamento] = useState([]);



    useEffect(() =>{

        const CargarDepartamentos = async ()=>{

            try{

                const response = await fetch("https://localhost:7103/gerencia/mostrar-departamentos",{

                    method: "GET",
                    headers:{

                        "Content-Type":"application/json"
                    }

                   

                });

                if(!response.ok){

                    const error_cargar_dep = await response.text();
                    console.log("error cargar datos" + error_cargar_dep);
                }else{

                    const data = await response.json();
                    setArrayDepartamento(data);
                }

            }catch(err){
                console.log("error Cargar_departamento" + err);
            }

        }

        CargarDepartamentos();
    },[]);

    return(

    

        <>
        
            

                <select name="txt_dep" id="tx_de" value={SelectedValue} onChange={Value}>
                
                {Array_Departamento.map((dep,index) => (
                        <option key={index} value={dep}  >{dep}</option>

                ))}
                

                </select>
            
        
        
        </>

    );

}

export default ComboboxDepartamentos;