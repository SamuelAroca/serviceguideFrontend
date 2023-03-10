import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../styled-sheets/NavbarComp.css";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "../pages/home/components/Modal";
import ModalRegister from "../pages/home/components/ModalRegister";
import Login from "../pages/home/components/Login";

const NavbarComp = () => {
  const [fix, setFix] = useState(false);

  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 392) {
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
            Home
          </a>
          <a className="link" href="#aboutUs">
            Nosotros
          </a>
          <Link className="link" to="/news">
            Noticias
          </Link>
          <Link className="link" onClick={() => setOpenRegister(!openRegister)}>
            Registrar
          </Link>
          <Link className="link" onClick={() => setOpen(!open)}>
            Ingresar
          </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
      {/* Modales para registro y login */}
      <Modal open={open} setOpen={setOpen} />
      <ModalRegister open={openRegister} setOpen={setOpenRegister} />
    </>
  );
};

export default NavbarComp;
