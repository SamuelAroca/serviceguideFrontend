import styles from "./RouteLoader.module.css";

// Se muestra mientras React carga el bundle de la siguiente ruta (lazy
// loading). Antes el Suspense usaba fallback={null}, lo que dejaba un
// pantallazo en blanco entre una página y otra; esto evita ese parpadeo.
// fullScreen=false lo usa dentro de un layout que ya tiene su propia
// altura (p. ej. el "content" del dashboard privado) en vez de forzar
// 100vh sobre un contenedor que ya está acotado.
const RouteLoader = ({ fullScreen = true }) => {
  return (
    <div className={fullScreen ? styles.wrapper : styles.wrapperInline}>
      <div className={styles.spinner} />
    </div>
  );
};

export default RouteLoader;
