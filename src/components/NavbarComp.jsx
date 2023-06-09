import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../styled-sheets/NavbarComp.css";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarComp = () => {
  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 613) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header className={fix ? "header-main fixed" : "header-main"}>
        <div className="logo_container">
          <RiWaterFlashFill className="main-logo" />
          ServiceGuide
        </div>
        <nav className="nav-main" ref={navRef}>
          <a className="link" href="#home">
            Inicio
          </a>
          <a className="link" href="#aboutUs">
            Nosotros
          </a>
          <a className="link" href="#team">
            Equipo
          </a>
          <Link className="link" to={"/login/signUp"}>
            Registro
          </Link>
          <Link className="link" to={"/login"}>
            Iniciar Sesión
          </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
};

export default NavbarComp;
