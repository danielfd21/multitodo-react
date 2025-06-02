import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ComboboxDepartamentos from '../../Componentes/Gerencia/ComboboxDepartamentos';

function ActualizarEmpleados() {
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha_de_nacimiento, setFechaDeNacimiento] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cedula_anterior, setCedulaAnterior] = useState('');
  const [correo_anterior, setCorreoAnterior] = useState('');
  const location = useLocation();

  useEffect(() => {

    const cargarEmpleado = async () => {
      let cedulaSession = '';
      let correoSession = '';

      if (location.state && location.state.cedula && location.state.correo) {
        cedulaSession = location.state.cedula;
        correoSession = location.state.correo;

        sessionStorage.setItem('cedula_anterior', cedulaSession);
        sessionStorage.setItem('correo_anterior', correoSession);
      } else {
        cedulaSession = sessionStorage.getItem('cedula_anterior') || '';
        correoSession = sessionStorage.getItem('correo_anterior') || '';
      }

      setCedulaAnterior(cedulaSession);
      setCorreoAnterior(correoSession);

      if (!cedulaSession) return;

      try {
        const response = await fetch(`https://localhost:7103/gerencia/filtrar-empleados-cedula/${cedulaSession}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          const errorText = await response.text();
          setError(errorText);
          return;
        }

        const data = await response.json();
        if (data.length > 0) {
          const emp = data[0];
          setCedula(emp.cedula);
          setNombres(emp.nombres);
          setApellidos(emp.apellidos);
          setCorreo(emp.correo);
          setFechaDeNacimiento(emp.fecha_de_nacimiento);
          setDepartamento(emp.departamento?.nombre || '');
        }
      } catch (err) {
        console.log('error_fetch_actualizar', err);
      }
    };

    cargarEmpleado();
  }, [location.state]);

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cedula || !nombres || !apellidos || !correo || !fecha_de_nacimiento) {
      setError('Por favor llene todos los campos');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7103/gerencia/actualizar-empleado/${cedula_anterior}/${correo_anterior}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Cedula: cedula,
          Nombres: nombres,
          Apellidos: apellidos,
          Correo: correo,
          Fecha_de_nacimiento: fecha_de_nacimiento,
          departamento: departamento
        })
      });

      if (!response.ok) {
        const error_actualizar = await response.text();
        setMensaje('');
        setError(error_actualizar);
      } else {
        const data = await response.text();
        setError('');
        setMensaje(data);
        sessionStorage.setItem('cedula_anterior', cedula);
        sessionStorage.setItem('correo_anterior', correo);
        setCedulaAnterior(cedula);
        setCorreoAnterior(correo);
      }
    } catch (err) {
      console.log('error fetch actualizar', err);
    }
  };

  return (
    <>
      <h1>Actualizar Empleados</h1>
      <br />
      <form onSubmit={handlerSubmit}>
        <label>Cédula:</label>
        <input type="text" value={cedula} onChange={e => setCedula(e.target.value)} />
        <br />
        <label>Nombres:</label>
        <input type="text" value={nombres} onChange={e => setNombres(e.target.value)} />
        <br />
        <label>Apellidos:</label>
        <input type="text" value={apellidos} onChange={e => setApellidos(e.target.value)} />
        <br />
        <label>Correo:</label>
        <input type="text" value={correo} onChange={e => setCorreo(e.target.value)} />
        <br />
        <label>Fecha de nacimiento:</label>
        <input type="text" value={fecha_de_nacimiento} onChange={e => setFechaDeNacimiento(e.target.value)} />
        <br />
        <label>Departamento:</label>
        <ComboboxDepartamentos SelectedValue={departamento}  Value={e => setDepartamento(e.target.value)} />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        <br />
        <input type="submit" value="Actualizar Empleado" />
      </form>
    </>
  );
}

export default ActualizarEmpleados;