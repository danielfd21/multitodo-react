import { Routes, Route } from "react-router-dom"
import Login from './Vistas/Login';
import IndexGerencia from './Vistas/gerencia/IndexGerencia';
import RegistrarEmpleados from './Vistas/gerencia/RegistrarEmpleado';
import ActualizarClave from './Vistas/gerencia/ActualizarClave';
import VentanaEmpleados from './Vistas/gerencia/Ventana_Empleados';
import ActualizarEmpleados from './Vistas/gerencia/ActualizarEmpleado';

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/gerencia" element={<IndexGerencia/>}></Route>
        <Route path="/registrar-empleados" element={<RegistrarEmpleados/>}></Route>
        <Route path="/actualizar-clave" element={<ActualizarClave/>}></Route>
        <Route path="/ventana-empleados" element={<VentanaEmpleados/>}></Route>
        <Route path="/actualizar-empleados" element={<ActualizarEmpleados/>}></Route>
      </Routes>
    </div>
  )
}

export default App
