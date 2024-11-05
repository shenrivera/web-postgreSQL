import React, { useRef, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineCloseCircle, AiOutlineArrowUp } from "react-icons/ai";

function Dialog({ isOpen, onClose, title, content }) {
  const fileInputRef = useRef(null); // Referencia al campo de entrada de archivo
  const [fileUploaded, setFileUploaded] = useState(false); // Estado para rastrear si se ha subido el archivo
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file && file.type === "application/pdf") {
      // Si es un archivo PDF, hacer algo con él (por ejemplo, subirlo)
      console.log("Archivo PDF seleccionado:", file);
      setFileUploaded(true); // Establecer el estado de subida de archivo a true
      setErrorMessage(""); // Limpiar el mensaje de error
      onClose(); // Cerrar el diálogo
    } else {
      // Si no es un archivo PDF, mostrar un mensaje de error
      setErrorMessage("Por favor selecciona un archivo PDF.");
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <span className="text-4xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full p-2">
            <AiOutlineInfoCircle className="text-6xl text-blue-500" />
          </div>
        </span>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-600">{title}</h2>
          <p className="text-lg mb-6 text-blue-500">{content}</p>
          {fileUploaded ? ( // Mostrar el mensaje de éxito si el archivo se ha subido
            <div className="text-black mb-4">El caso ya esta cerrado y el archivo se ha subido con éxito.</div>
          ) : (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 flex items-center rounded hover:bg-primary mr-4"
            >
              Cancelar
              <span className="ml-2">
                <AiOutlineCloseCircle />
              </span>
            </button>
            {!fileUploaded && ( // Mostrar el botón de subir solo si el archivo no se ha subido
              <div className="flex items-center">
                {/* Campo de entrada de archivo */}
                <input
                  type="file"
                  accept=".pdf" // Solo permite archivos PDF
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => fileInputRef.current.click()} // Simular clic en el campo de entrada de archivo
                  className="bg-blue-500 text-white px-4 py-2 flex items-center rounded hover:bg-primary"
                >
                  Subir
                  <span className="ml-2">
                    <AiOutlineArrowUp />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
