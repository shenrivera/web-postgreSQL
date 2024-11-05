import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine, RiFileList2Line, RiAlarmWarningLine, RiTimerLine, RiCheckDoubleLine } from "react-icons/ri";
import { MdPlaylistAddCircle } from "react-icons/md";
import TextInput from "../../components/ui/TextInput"; // Importa el componente TextInput
import CardCasos from "../../components/CardCasosos"; // Importa el componente CardCasos (revisar el nombre correcto)
import { getForms } from "/src/api.js";

const Home = () => {
  // Estados locales para gestionar el término de búsqueda, los datos filtrados y los mensajes de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFormData, setFilteredFormData] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  // Función que cuenta los casos por estado
  const countCasosByEstado = (estado) => {
    return filteredFormData.filter(form => form.estado === estado).length;
  };

  // Efecto para cargar los datos desde localStorage al iniciar el componente
  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
    setFilteredFormData(savedForms);
  }, []);

  // Efecto para filtrar los datos en base al término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFormData(JSON.parse(localStorage.getItem("forms")) || []);
      setSearchMessage("");
    } else {
      const filteredData = JSON.parse(localStorage.getItem("forms") || "[]").filter(form =>
        form.radicado.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFormData(filteredData);
      setSearchMessage(filteredData.length > 0 ? "" : "Demanda no encontrada");
    }
  }, [searchTerm]);


   useEffect(() => {
    const fetchForms = async () => {
      try {
        const forms = await getForms();
        setFilteredFormData(forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
        setSearchMessage("Error al cargar los datos");
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado principal */}
      <h1 className="text-4xl text-white mb-8">Vista de Casos</h1>

      {/* Grilla de tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <CardCasos
          caso="Total"
          totalCasos={filteredFormData.length}
          texto="Total de Casos Jurídicos"
          icon={<RiFileList2Line />}
        />
        <CardCasos
          caso="Pendientes"
          totalCasos={countCasosByEstado("Activo")}
          texto="Casos Pendientes de Atención"
          icon={<RiAlarmWarningLine />}
        />
        <CardCasos
          caso="En Proceso"
          totalCasos={countCasosByEstado("Seguimiento")}
          texto="Casos en Proceso de Seguimiento"
          icon={<RiTimerLine />}
        />
        <CardCasos
          caso="Cerrados"
          totalCasos={countCasosByEstado("Cerrado")}
          texto="Casos Cerrados"
          icon={<RiCheckDoubleLine />}
        />
      </div>

      {/* Sección de tablas de demandas */}
      <div className="my-12">
        {/* Título de la sección */}
        <h2 className="text-2xl text-white mb-4">Tablas de Demandas</h2>
        {/* Barra de herramientas (agregar demanda y campo de búsqueda) */}
        <div className="flex items-center space-x-4 mb-4">
          <Link to="Desarmonias" className="bg-blue-500 text-white px-4 py-2 font-bold rounded flex items-center hover:bg-primary">
            Agregar Demanda <MdPlaylistAddCircle className="ml-2" />
          </Link>
          <div className="flex items-center">
            <TextInput
              type="text"
              placeholder="Buscar Casos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-r-md focus:ring focus:border-primary-300"
            />
            
          </div>
        </div>

        {/* Contenedor de la tabla de demandas */}
        <div className="bg-secondary-100 p-8 rounded-xl">
          {/* Encabezados de la tabla */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-center">
            <h5>N° Radicado</h5>
            <h5>Fecha</h5>
            <h5>Demandante</h5>
            <h5>Demandado</h5>
            <h5>Tipo Demanda</h5>
            <h5>Estado</h5>
            <h5>Opción</h5>
          </div>

          {/* Cuerpo de la tabla (renderiza los casos filtrados) */}
          {filteredFormData.length > 0 ? (
            filteredFormData.map((form, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-5 mb-2 bg-secondary-900 p-4 rounded-xl text-center">
                <div>{form.radicado}</div>
                <div>{form.demandante && form.demandante.fecha}</div>
                <div>{form.demandante && form.demandante.nombres}</div>
                <div>
                  {form.demandados && form.demandados.map((demandado, index) => (
                    <span key={index}>{demandado.nombres}</span>
                  ))}
                </div>
                <div>{form.demandante && form.demandante.tipoDemanda && form.demandante.tipoDemanda.label}</div>
                <div className={`py-1 px-2 rounded-lg ${form.estado === "Activo" ? "bg-green-600 text-white" : form.estado === "Seguimiento" ? "bg-orange-500 text-white" : ""}`}>
                  {form.estado === "Seguimiento" ? "Seguimiento" : form.estado}
                </div>
                <div>
                  {/* Enlace para ver detalles del caso */}
                  <Link
                    to={{ 
                      pathname: `/detalles/${form.radicado}`,
                      state: { radicado: form.radicado }
                    }}
                    className="underline text-blue-500 hover:text-blue-700"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">{searchMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
