import React, {useState} from "react";
import { Link } from "react-router-dom";
//iconos
import {
  RiBarChart2Fill,
  RiGitRepositoryFill,
  RiLogoutCircleRLine,
  RiMenuLine,
  RiCloseFill 
} from "react-icons/ri";
import { IoMdBonfire } from "react-icons/io";

const Sidebar = () => {

  const [showMenu, setshowMenu]=useState(false);

  return (

    <>
     <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static  w-[80%] md:w-[40%] lg-w-[30%] xl:w-auto h-full  top-0 bg-secondary-100 p-8 flex flex-col justify-between z-50 ${showMenu ? "left-0":"-left-full"} transition-all`}>
      <div>
        <h1 className="tex-center text-2xl font-bold text-white mb-10">
          Honduras
          <span className="text-primary text-4xl" />.
        </h1>
        <ul>
          <li>
            <Link
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              to="/"
            >
              <RiBarChart2Fill className="text-primary" />
              Inicio
            </Link>
          </li>

          <li>
            <Link
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              to="/Desarmonias"
            >
              <IoMdBonfire className="text-primary" />
              Desarmonias
            </Link>
          </li>

          <li>
            <Link
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              to="/Reportes"
            >
              <RiGitRepositoryFill className="text-primary" />
              Reportes
            </Link>
          </li>
        </ul>
      </div>
      <nav>
        <Link 
          className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
          to="/"
        >
          <RiLogoutCircleRLine className="text-primary" />
          Cerrar Sesion
        </Link>
      </nav>
    </div>

    <button onClick={() => setshowMenu( !showMenu)} className="xl:hidden fixed  bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50">
      {showMenu ? <RiCloseFill /> :  <RiMenuLine />}
   
      
    </button>
    </>
    

   
  );
};

export default Sidebar;
