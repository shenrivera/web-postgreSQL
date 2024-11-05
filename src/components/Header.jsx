import React  from "react";
import Logo from "../assets/fondoper.svg";

//libreria para sub-menus de User “drop down”
import { Menu, MenuItem, MenuButton} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
//iconos
import { 
  RiArrowDownSFill,
  RiSettings4Line, 
  RiLogoutCircleRLine} 
  from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">

      <nav className="flex items-center gap-x-4">
        <Menu
          menuButton=
          {
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg transition-colors">
              <img src={Logo} className="w-8 h-10 object-cover rounded-full" />
              <samp>Cabildo Hondurdas</samp>
              <RiArrowDownSFill />
            </MenuButton>
          }
          transition
          
          

          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem 
          className="p-0 hover:bg-transparent">
            <Link
              to="/perfil"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img src={Logo} className="w-8 h-10 object-cover rounded-full" />

              <div className="flex flex-col gap-1 text-sm">
                <samp className="text-sm">Cabildo Hondurdas</samp>
                <samp className="text-xs text-gray-500">
                  cabildodehonduras@hotmail.es
                </samp>
              </div>
            </Link>
            
          </MenuItem>
          
          <hr className="my-4 border-gray-500" />

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings4Line /> Configuracion
            </Link>
          </MenuItem>

         

          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
               <RiLogoutCircleRLine/> Cerrar Sesion
            </Link>
          </MenuItem>
          
        </Menu>
      
      </nav>
    </header>
  );
};

export default Header;
