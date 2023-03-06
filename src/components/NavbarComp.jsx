import { Link } from "react-router-dom";
import { useRef } from "react";
import "../styled-sheets/NavbarComp.css";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarComp = () => {

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  return (
    <header className="header-main">
      <h3><RiWaterFlashFill className="main-logo" />ServiceGuide</h3>
      <nav className="nav-main" ref={navRef}>
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/about'>Nosotros</Link>
        <Link className="link" to='/news'>Noticias</Link>
        <Link className="link" to='/register'>Registrar</Link>
        <Link className="link" to='/login'>Ingresar</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default NavbarComp;
