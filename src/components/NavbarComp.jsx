import { Link } from "react-router-dom";
import { useState } from "react";
import "../styled-sheets/NavbarComp.css";
import { RiWaterFlashFill } from "react-icons/ri";

const NavbarComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [fix, setFix] = useState(false);

  function setFixed() {
    if (window.scrollY >= 392) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener("scroll", setFixed);

  return (
    <div className="NavbarComp">
      <Link className="nav_logo_texto" to='/'><RiWaterFlashFill className="nav_logo" />ServiceGuide</Link>
      <div className={`nav_items ${isOpen && "open"}`}>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/about" className="link">
          Nosotros
        </Link>
        <Link to="/news" className="link">
          Noticias
        </Link>
        <Link to="/register" className="link">
          Registrar
        </Link>
        <Link to="/login" className="link">
          Ingresar
        </Link>
      </div>
      <div
        className={`nav_toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default NavbarComp;
