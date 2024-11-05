import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import Dialog from "../../components/ui/Dialog";
import Autoridad from "../../components/ui/Autoridad";


import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDetalles from '../../components/PdfDetalles';

import {
  AiOutlineAudit,
  AiOutlineDownload,
  AiOutlineUserAdd,
  AiOutlineCloseCircle,
} from "react-icons/ai";

function Seguimiento() {
  const { radicado } = useParams(); // Obtener el radicado de la URL
  const [seguimientos, setSeguimientos] = useState([]);
  const [seguimientoActual, setSeguimientoActual] = useState({
    lugarReunion: "",
    declaracionMandante: "",
    declaracionDemandado: "",
    desarrollo: "",
    conclusiones: "",
    compromisos: "",
    cierre: "",
    autoridades: [],
    radicado: radicado,
    fechaInicio: "", // Incluir fecha de inicio en el estado
  });
  const [autoridades, setAutoridades] = useState([
    { id: 0, nombre: "", cargo: "" },
  ]);
  const [contadorIds, setContadorIds] = useState(1);
  const [mensajeError, setMensajeError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const seguimientosGuardados =
      JSON.parse(localStorage.getItem("seguimientos")) || [];
    setSeguimientos(seguimientosGuardados);

    const seguimientoEncontrado = seguimientosGuardados.find(
      (seg) => seg.radicado === radicado
    );
    if (seguimientoEncontrado) {
      setSeguimientoActual({
        ...seguimientoEncontrado,
        fechaInicio: seguimientoEncontrado.fechaInicio || getCurrentDateTime(),
      });
      setAutoridades(seguimientoEncontrado.autoridades || []);
    } else {
      const currentDate = getCurrentDateTime();
      setSeguimientoActual({
        lugarReunion: "",
        declaracionMandante: "",
        declaracionDemandado: "",
        desarrollo: "",
        conclusiones: "",
        compromisos: "",
        cierre: "",
        autoridades: [],
        radicado: radicado,
        fechaInicio: currentDate,
      });

      // Guardar la fecha de inicio en localStorage dentro de la estructura de seguimientoActual
      const newSeguimientos = [
        ...seguimientosGuardados,
        {
          ...seguimientoActual,
          fechaInicio: currentDate,
        },
      ];
      localStorage.setItem("seguimientos", JSON.stringify(newSeguimientos));
    }
  }, [radicado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeguimientoActual((prevSeguimiento) => ({
      ...prevSeguimiento,
      [name]: value,
    }));
  };

  const handleAgregarAutoridad = () => {
    const newId = contadorIds + 1;
    setAutoridades([...autoridades, { id: newId, nombre: "", cargo: "" }]);
    setContadorIds(newId);
  };

  const handleEliminarAutoridad = (id) => {
    if (autoridades.length > 1) {
      const nuevasAutoridades = autoridades.filter(
        (autoridad) => autoridad.id !== id
      );
      setAutoridades(nuevasAutoridades);
    }
  };

  const handleGuardarSeguimiento = () => {
    if (!camposCompletos()) {
      setMensajeError(
        "Por favor completa todos los campos del formulario, incluyendo Nombre y Cargo de las autoridades."
      );
      return;
    }

    const nuevoSeguimiento = {
      ...seguimientoActual,
      autoridades: autoridades.map((autoridad) => ({
        nombre: autoridad.nombre,
        cargo: autoridad.cargo,
      })),
    };

    // Obtener el radicado del seguimiento actual
    const { radicado } = nuevoSeguimiento;

    // Actualizar el estado del seguimiento a "Seguimiento"
    const updatedSeguimientos = seguimientos.map((seg) => {
      if (seg.radicado === radicado) {
        return { ...seg, ...nuevoSeguimiento, estado: "Seguimiento" };
      }
      return seg;
    });

    // Actualizar los seguimientos en el estado
    setSeguimientos(updatedSeguimientos);

    // Actualizar los seguimientos en localStorage
    localStorage.setItem("seguimientos", JSON.stringify(updatedSeguimientos));

    // Obtener los datos guardados del localStorage bajo la clave "forms"
    const storedForms = JSON.parse(localStorage.getItem("forms")) || [];

    // Actualizar el estado del caso a "Seguimiento" en los datos guardados
    const updatedForms = storedForms.map((form) => {
      if (form.radicado === radicado) {
        return { ...form, estado: "Seguimiento" };
      }
      return form;
    });

    // Guardar los formularios actualizados en localStorage
    localStorage.setItem("forms", JSON.stringify(updatedForms));

    // Alerta de seguimiento guardado correctamente
    alert("Seguimiento guardado correctamente.");
  };

  const camposCompletos = () => {
    return (
      seguimientoActual.lugarReunion.trim() !== "" &&
      seguimientoActual.declaracionMandante.trim() !== "" &&
      seguimientoActual.declaracionDemandado.trim() !== "" &&
      seguimientoActual.desarrollo.trim() !== "" &&
      seguimientoActual.conclusiones.trim() !== "" &&
      seguimientoActual.compromisos.trim() !== "" &&
      seguimientoActual.cierre.trim() !== "" &&
      autoridades.every((autoridad) => autoridad.nombre && autoridad.cargo)
    );
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleString("en-US", options);
  };




  return (
    <div className="container mx-auto p-4 bg-secondary-100">
      <h2 className="text-2xl font-bold mb-4">Seguimiento del Caso</h2>

      <div className="mb-4 border p-4">
        <div className="flex mb-4">
          <label className="mr-14 mt-0">
            <strong>Fecha y hora de inicio:</strong>
          </label>
          <div className="flex-grow">
            <span>{seguimientoActual.fechaInicio}</span>
          </div>
        </div>

        <div className="flex mb-4">
          <label className="block mb-4 mr-4 mt-1">
            <strong>Lugar de Reunión:</strong>
          </label>
          <div className="flex-grow">
            <TextInput
              className="w-full"
              name="lugarReunion"
              value={seguimientoActual.lugarReunion}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2">Autoridades y Implicados</h3>
        {autoridades.map((autoridad) => (
          <Autoridad
            key={autoridad.id}
            autoridad={autoridad}
            eliminarAutoridad={() => handleEliminarAutoridad(autoridad.id)}
            autoridades={autoridades}
            setAutoridades={setAutoridades}
            nombre={autoridad.nombre}
            cargo={autoridad.cargo}
          />
        ))}
        <button
          onClick={handleAgregarAutoridad}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-primary flex items-center"
        >
          Agregar Autoridad
          <span className="ml-2">
            <AiOutlineUserAdd />
          </span>
        </button>
      </div>

      <div className="mb-4 border p-4">
        <h3 className="text-lg font-bold mb-2">Descargos de Implicados</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <textarea
            required
            className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
            name="declaracionMandante"
            value={seguimientoActual.declaracionMandante}
            onChange={handleChange}
            placeholder="Declaración del mandante"
          ></textarea>
          <textarea
            required
            className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
            name="declaracionDemandado"
            value={seguimientoActual.declaracionDemandado}
            onChange={handleChange}
            placeholder="Declaración del demandado"
          ></textarea>
        </div>
      </div>

      <div className="mb-4 border p-4">
        <label className="block mb-1">Desarrollo:</label>
        <textarea
          required
          className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
          name="desarrollo"
          value={seguimientoActual.desarrollo}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 border p-4">
        <label className="block mb-1">Conclusiones:</label>
        <textarea
          required
          className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
          name="conclusiones"
          value={seguimientoActual.conclusiones}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 border p-4">
        <label className="block mb-1">Compromisos:</label>
        <textarea
          required
          className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
          name="compromisos"
          value={seguimientoActual.compromisos}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 border p-4">
        <label className="block mb-1">Cierre:</label>
        <textarea
          required
          className="border bg-secondary-900 rounded px-2 py-1 w-full h-24"
          name="cierre"
          value={seguimientoActual.cierre}
          onChange={handleChange}
        ></textarea>
      </div>

      {mensajeError && <p className="text-red-500">{mensajeError}</p>}

      <div className="justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <button
          onClick={handleGuardarSeguimiento}
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary"
        >
          Guardar Seguimiento
          <span className="ml-2">
            <AiOutlineAudit />
          </span>
        </button>

       

        <PDFDownloadLink document={<PdfDetalles />} fileName="documento.pdf">
      {({ loading: pdfLoading }) => {
        setLoading(pdfLoading);
        if (pdfLoading) {
          return (
            <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary">
              Descargando PDF...
            </button>
          );
        } else {
          return (
            <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary">
              Descargar Acta PDF
            </button>
          );
        }
      }}
    </PDFDownloadLink>

        <button
          onClick={handleOpenDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold flex items-center justify-center hover:bg-primary"
        >
          Cerrar
          <span className="ml-2">
            <AiOutlineCloseCircle />
          </span>
        </button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Cerrar caso"
        content="Para poder cerrar el caso de desarmonía, debes subir el acta de los acuerdos de la demanda o, en caso de cancelación por parte del demandante, subir el soporte correspondiente."
      />
    </div>
  );
}

export default Seguimiento;
