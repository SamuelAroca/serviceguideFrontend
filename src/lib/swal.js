import BaseSwal from "sweetalert2";

// SweetAlert2 soporta theme: "light"/"dark" nativo, pero nadie lo estaba
// pasando, asi que los dialogos siempre salian blancos aunque el resto de
// la app estuviera en modo oscuro. Se lee el tema actual directo del DOM
// (ThemeContext.jsx ya pone data-theme en <html> de forma sincronica) en
// vez de depender de useThemeMode(), porque la mayoria de los Swal.fire()
// se disparan desde handlers async fuera de un componente React.
const currentTheme = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

const Swal = {
  fire: (options = {}) => BaseSwal.fire({ theme: currentTheme(), ...options }),
};

export default Swal;
