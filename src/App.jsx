import { BrowserRouter, Routes, Route } from "react-router-dom"

//aui esta mis layout
import LayoutAuth from "./layouts/LayoutAuth"
import LayoutAdmin from "./layouts/LayoutAdmin"
//traemos las paguinas de autenticacion
import Loguin from "./pages/auth/Loguin"
import Recupera from "./pages/auth/OlvidoPassword"
// traemos las paginas de administardor 
import Error404 from "./pages/Error404"
import Home from "./pages/admin/Home"
import Desarmonias from "./pages/admin/Desarmonias"
import PerfilUser from "./pages/admin/PerfilUser"
import DetalleCasos from "./pages/admin/DetalleCasos"
import Seguimiento from "./pages/admin/Seguimiento"
import Reportes from "./pages/admin/Reportes"
import { checkDatabaseConnection } from './api';
import React, { useEffect, useState } from 'react';

function App() {
  const [dbStatus, setDbStatus] = useState(null);

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const status = await checkDatabaseConnection();
        setDbStatus(status);
        console.log('Estado de la conexión:', status);
      } catch (error) {
        console.error('Error al verificar la conexión:', error);
        setDbStatus({ status: 'Error', message: 'No se pudo conectar a la base de datos' });
      }
    };

    verifyConnection();
  }, []);

  return (
    <BrowserRouter >
     {dbStatus && (
        <div className={`text-center p-2 ${dbStatus.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}>
          {dbStatus.message} {dbStatus.dbName && `- DB: ${dbStatus.dbName} en ${dbStatus.dbHost}:${dbStatus.dbPort}`}
        </div>
      )}
    <Routes>
    <Route path="/loguin" element={<Loguin/>}/>
    <Route path="/recuperar" element={<Recupera/>}/>
      
      
      <Route path="/" element={<LayoutAdmin/>}>
        <Route index element={<Home/>}/>
        
        <Route path="perfil" element={<PerfilUser/>}/>
        <Route path="desarmonias" element={<Desarmonias/>}/>
        <Route path="detalles/:radicado" element={<DetalleCasos/>}/>
        <Route path="/seguimiento/:radicado" element={<Seguimiento/>}/>
        <Route path="Reportes" element={<Reportes/>}/>
      </Route>

      <Route path="*" element={<Error404/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
