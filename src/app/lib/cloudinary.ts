// src/app/lib/cloudinary.ts
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing .env variables: VITE_CLOUDINARY_CLOUD_NAME and/or VITE_CLOUDINARY_UPLOAD_PRESET"
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  form.append("folder", "yph/designs");

  const res = await fetch(endpoint, { method: "POST", body: form });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${text}`);
  }

  const data = (await res.json()) as { secure_url?: string };

  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed: secure_url missing in response");
  }

  return data.secure_url;
}