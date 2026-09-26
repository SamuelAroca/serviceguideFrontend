import * as ReactPlayerModule from "react-player";

// react-player es CJS; segun el bundler/transform (esbuild, rolldown, rollup)
// el interop deja el componente real en .default o en .default.default. Se
// resuelve el que exista en vez de asumir uno fijo, para no depender del
// detalle interno de cada herramienta de build.
const ReactPlayer =
  ReactPlayerModule.default?.default ??
  ReactPlayerModule.default ??
  ReactPlayerModule;

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        url={"https://youtu.be/uRQkmDjP_jM"}
        width="56vw"
        height="60vh"
        controls
        muted
      />
    </div>
  );
};

export default VideoPlayer;
