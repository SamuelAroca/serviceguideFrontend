import { useRef, useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { IoIosWarning } from "react-icons/io";

const isPdf = (file) =>
  file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
// Dos facturas de casas distintas pueden llamarse igual (mismo nombre de
// archivo): solo se descarta un archivo si nombre, tamano y fecha coinciden.
const sameFile = (a, b) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

// Selector de PDF acumulativo: cada seleccion (o arrastre) se SUMA a la
// lista, asi no hace falta mantener Ctrl/Shift en el dialogo del sistema para
// elegir varios. Cada archivo se puede quitar con la x de su chip.
const PdfPicker = ({ files, setFiles, sx }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming) => {
    const pdfs = Array.from(incoming).filter(isPdf);
    if (pdfs.length === 0) return;
    const fresh = pdfs.filter((f) => !files.some((x) => sameFile(x, f)));
    if (fresh.length > 0) setFiles([...files, ...fresh]);
  };

  const handleChange = (event) => {
    addFiles(event.target.files);
    // Permite volver a elegir el mismo archivo despues de quitarlo.
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <Box
      sx={sx}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        hidden
        onChange={handleChange}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={() => inputRef.current?.click()}
        sx={{
          minHeight: "56px",
          borderStyle: dragging ? "dashed" : "solid",
        }}
      >
        {files.length > 0 ? "Agregar más PDF" : "Seleccionar PDF"}
      </Button>
      <Typography
        variant="caption"
        sx={{ display: "flex", alignItems: "center", gap: "4px", mt: 0.5, opacity: 0.8 }}
      >
        <IoIosWarning style={{ color: "gold", flexShrink: 0 }} />
        Solo si vas a subir recibos en PDF. Puedes arrastrarlos aquí y sumar varios.
      </Typography>
      {files.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {files.map((file, index) => (
            <Chip
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              label={file.name}
              title={`${file.name} (${Math.round(file.size / 1024)} KB)`}
              size="small"
              onDelete={() => setFiles(files.filter((f) => f !== file))}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PdfPicker;
