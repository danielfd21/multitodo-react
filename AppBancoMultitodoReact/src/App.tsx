import { Routes, Route } from "react-router-dom"
import Login from './Vistas/Login';
import IndexGerencia from './Vistas/gerencia/IndexGerencia';
import RegistrarEmpleados from './Vistas/gerencia/RegistrarEmpleado';
import ActualizarClave from './Vistas/gerencia/ActualizarClave';
import VentanaEmpleados from './Vistas/gerencia/Ventana_Empleados';
import ActualizarEmpleados from './Vistas/gerencia/ActualizarEmpleado';
import AuthGuard from './Guard/AuthGuard';

function App() {
  return (
    <div>
       
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/gerencia" element={<AuthGuard><IndexGerencia/></AuthGuard>}></Route>
        <Route path="/registrar-empleados" element={<AuthGuard><RegistrarEmpleados/></AuthGuard>}></Route>
        <Route path="/actualizar-clave" element={<AuthGuard><ActualizarClave/></AuthGuard>}></Route>
        <Route path="/ventana-empleados" element={<AuthGuard><VentanaEmpleados/></AuthGuard>}></Route>
        <Route path="/actualizar-empleados" element={<AuthGuard><ActualizarEmpleados/></AuthGuard>}></Route>
      </Routes>
      
    </div>
  )
}

export default App
