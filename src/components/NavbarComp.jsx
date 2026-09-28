import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiWaterFlashFill } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiSun, BiMoon } from "react-icons/bi";
import { useThemeMode } from "../context/ThemeContext";
import "../styled-sheets/NavbarComp.css";

const NavbarComp = () => {
  const [fix, setFix] = useState(false);
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const { theme, toggleTheme } = useThemeMode();

  useEffect(() => {
    // rAF coalesca los scroll events (pueden disparar decenas por segundo)
    // a como mucho un setFix por frame; passive:true le dice al navegador
    // que este listener nunca hace preventDefault, asi no bloquea el
    // scroll nativo esperando a que termine de correr.
    let ticking = false;
    const setFixed = () => {
      setFix(window.scrollY >= 613);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(setFixed);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showNavbar = () => {
    setShowResponsiveNav((prev) => !prev);
  };

  return (
    <>
      <header className={fix ? "header-main fixed" : "header-main"}>
        <div className="logo_container">
          <RiWaterFlashFill className="main-logo" />
          ServiceGuide
        </div>
        <nav
          className={
            showResponsiveNav ? "nav-main responsive_nav" : "nav-main"
          }
        >
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
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? <BiSun /> : <BiMoon />}
          </button>
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
