import { useEffect, useState } from "react";
import {
  SidebarLayout,
  SidebarToggleButton,
  SidebarBackdrop,
} from "../styled-components/sidebar-layout.styled";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BiHomeAlt,
  BiAddToQueue,
  BiListUl,
  BiLogOut,
  BiUser,
  BiDownArrow,
  BiReceipt,
  BiMenu,
  BiX,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { MyContext } from "../context/UserContext";
import { useThemeMode } from "../context/ThemeContext";
import { BluePaleteColors } from "../palete-colors/blue-colors.palete";
import Logo from "../assets/Logo.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import httpClient from "../api/httpClient";

const StyledLink = styled(Link)`
  background-color: ${(props) =>
    props.$rute === true ? `var(--stat-tint-3)` : ""};
  .icon {
    color: ${(props) =>
      props.$rute === true
        ? `${BluePaleteColors.C500}`
        : `var(--text-secondary-color)`};
  }
  p {
    color: ${(props) =>
      props.$rute === true
        ? `${BluePaleteColors.C500}`
        : `var(--text-secondary-color)`};
  }
  border: ${(props) =>
    props.$rute === true ? `1px solid var(--stat-tint-2)` : ""};
`;

const StyledHouseLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1.1rem;
  padding: 0;
  font-size: 0.8rem;
  height: 2rem;
  margin-left: 1.8rem;
  transition: 0.2s all;
  p {
    color: ${(props) =>
      props.$rute === true
        ? `${BluePaleteColors.C600}`
        : `var(--text-secondary-color)`};
  }
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: ${(props) =>
      props.$rute === true
        ? `${BluePaleteColors.C600}`
        : `var(--text-secondary-color)`};
    opacity: ${(props) => (props.$rute === true ? `100%` : `50%`)};
  }

  &:hover {
    color: var(--text-color);
  }
`;

const Sidebar = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { user, houses, updateUserData, setUserData } = useContext(MyContext);
  const { theme, toggleTheme } = useThemeMode();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const url = import.meta.env.VITE_API_AUTH;

  const handleLogout = async () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "¡Tendrás que iniciar sesión nuevamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const logout = async () => {
    // Cerrar sesion debe funcionar para el usuario aunque la llamada al
    // backend falle (red caida, token ya vencido, etc.): antes, si esa
    // llamada fallaba, el usuario se quedaba "atascado" logueado sin
    // ningun aviso. Revocar el token en el server es best-effort; borrar
    // la cookie local y sacarlo de la app no deberia depender de eso.
    try {
      await httpClient.post(`${url}/logout`);
    } catch (error) {
      console.log(error);
    } finally {
      Cookies.remove("token");
      setUserData([]);
      navigate("/");
    }
  };

  return (
    <>
      <SidebarToggleButton
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMobileOpen ? <BiX /> : <BiMenu />}
      </SidebarToggleButton>
      <SidebarBackdrop
        $open={isMobileOpen}
        onClick={() => setIsMobileOpen(false)}
      />
      <SidebarLayout className={isMobileOpen ? "open" : ""}>
      <div className="top_sidebar">
        <img src={Logo} alt="logo" loading="lazy" />
        <p>{user !== null ? user : ""}</p>
      </div>
      <div className="middle_sidebar">
        <StyledLink
          to={`/private/major/home`}
          $rute={pathname === `/private/major/home`}
        >
          <BiHomeAlt className="icon" />
          <p>Inicio</p>
        </StyledLink>
        <StyledLink
          to={`/private/major/houses/addhouse`}
          $rute={pathname === `/private/major/houses/addhouse`}
        >
          <BiAddToQueue className="icon" />
          <p>Agregar casa</p>
        </StyledLink>
        <StyledLink
          to={`/private/major/receipts/addreceipt`}
          $rute={pathname === `/private/major/receipts/addreceipt`}
        >
          <BiReceipt className="icon" />
          <p>Agregar recibo</p>
        </StyledLink>
        <StyledLink
          onClick={() => setIsSessionOpen(!isSessionOpen)}
          $rute={pathname.includes(`house-detail`)}
        >
          <BiDownArrow
            className="arrow_icon"
            style={{
              rotate: isSessionOpen ? "0deg" : "180deg",
              transition: "0.3s all",
            }}
          />
          <p>Casas</p>
        </StyledLink>
        <motion.ul
          animate={{
            opacity: isSessionOpen ? 1 : 0,
            y: isSessionOpen ? 0 : -20,
          }}
          transition={{ duration: 0.2 }}
          style={{ display: isSessionOpen ? "block" : "none" }}
          className="sessions_list"
        >
          {houses?.map((c) => (
            <li key={c.id}>
              <StyledHouseLink
                to={`/private/house-detail/${c.id}`}
                $rute={pathname === `/private/house-detail/${c.id}`}
              >
                <p>{c.name}</p>
              </StyledHouseLink>
            </li>
          ))}
        </motion.ul>
        <StyledLink
          to={`/private/major/user/settings`}
          $rute={pathname === `/private/major/user/settings`}
        >
          <RiUserSettingsLine className="icon" />
          <p>Ajustes de usuario</p>
        </StyledLink>
      </div>
      <div className="bottom_sidebar">
        <div className="logout_button" onClick={toggleTheme}>
          {theme === "dark" ? (
            <BiSun className="icon" />
          ) : (
            <BiMoon className="icon" />
          )}
          {theme === "dark" ? "Modo claro" : "Modo oscuro"}
        </div>
        <div className="logout_button" onClick={handleLogout}>
          <BiLogOut className="icon" />
          Cerrar sesión
        </div>
      </div>
      </SidebarLayout>
    </>
  );
};

export default Sidebar;
