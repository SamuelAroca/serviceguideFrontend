import httpClient from "../api/httpClient";
import Swal from "./swal";
import { getErrorMessage } from "../Utilities";

const escapeHtml = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Sube los PDF de a uno, en orden, al endpoint `${apiUrl}/read`: el backend
// crea la casa si no existe, y en paralelo dos PDF de una casa nueva podrian
// intentar crearla a la vez. Un fallo no corta el resto.
// Devuelve [{ name, ok, text }] con un resultado por archivo.
export const uploadReceiptPdfs = async (apiUrl, files) => {
  const results = [];
  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append("archivoPdf", file);
      const response = await httpClient.post(`${apiUrl}/read`, formData);
      results.push({ name: file.name, ok: true, text: response.data.message });
    } catch (error) {
      console.log(error);
      results.push({ name: file.name, ok: false, text: getErrorMessage(error) });
    }
  }
  return results;
};

// Un solo aviso con una linea por archivo.
export const showUploadSummary = (results) => {
  const failed = results.filter((r) => !r.ok).length;
  const lines = results
    .map((r) => `${r.ok ? "✔" : "✘"} ${r.name}: ${r.text}`)
    .join("\n");
  let icon = "warning";
  if (failed === 0) icon = "success";
  else if (failed === results.length) icon = "error";
  return Swal.fire({
    icon,
    title:
      failed === 0
        ? `${results.length} recibo(s) subido(s)`
        : `${results.length - failed} de ${results.length} subidos`,
    html: `<pre style="text-align:left;white-space:pre-wrap;font-size:0.85rem">${escapeHtml(lines)}</pre>`,
  });
};
