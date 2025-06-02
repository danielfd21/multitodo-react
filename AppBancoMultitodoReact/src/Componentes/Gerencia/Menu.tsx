import { Link } from "react-router-dom";
const MenuGerencia = () =>{

    return(
        <nav>
        <ul>
            <li> <Link to={"/gerencia"}> Inicio</Link></li>
            <li> <Link to={"/registrar-empleados"}>Registro</Link></li>
            <li> <Link to={"/actualizar-clave"}>Actualizar Clave</Link> </li>
            <li> <Link to={"/ventana-empleados"}>Editar Empleado</Link></li>
        </ul>
    </nav>


    );

    

}

export default MenuGerencia;