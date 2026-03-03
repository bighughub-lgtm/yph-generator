// src/app/lib/zipDownload.ts
import JSZip from "jszip";

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const comma = dataUrl.indexOf(",");
  if (comma === -1) throw new Error("Invalid data URL");
  const base64 = dataUrl.slice(comma + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function downloadPngsAsZip(
  items: { filename: string; dataUrl: string }[],
  zipName = "mockups.zip"
) {
  const zip = new JSZip();

  for (const item of items) {
    const bytes = dataUrlToUint8Array(item.dataUrl);
    zip.file(item.filename, bytes);
  }

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = zipName;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}