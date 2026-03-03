// src/app/lib/renderMockup.ts
export type MockupAssets = {
  bgUrl: string;        // BG jpg
  deviceUrl: string;    // device png
  caseBaseUrl: string;  // case png
  textureUrl: string;   // case texture png
  edgesUrl: string;     // front edges png
  shadowUrl: string;    // shadow png
  maskUrl: string;      // mask png (alpha)
};

export type RenderOptions = {
  outWidth?: number;
  outHeight?: number;
  alphaThreshold?: number;
};

type BBox = { x: number; y: number; w: number; h: number };

async function loadBitmap(url: string): Promise<ImageBitmap> {
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  const blob = await res.blob();
  return await createImageBitmap(blob);
}

function alphaBBox(imgData: ImageData, alphaThreshold = 1): BBox | null {
  const { data, width, height } = imgData;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3];
      if (a >= alphaThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function coverFit(srcW: number, srcH: number, dstW: number, dstH: number) {
  const scale = Math.max(dstW / srcW, dstH / srcH);
  const w = srcW * scale;
  const h = srcH * scale;
  const x = (dstW - w) / 2;
  const y = (dstH - h) / 2;
  return { x, y, w, h };
}

function ensure2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("No 2D context");
  return ctx;
}

export async function renderMockupToDataUrl(
  assets: MockupAssets,
  designUrl: string,
  opts: RenderOptions = {}
): Promise<string> {
  const alphaThreshold = opts.alphaThreshold ?? 1;

  const [bg, device, caseBase, texture, edges, shadow, mask, design] = await Promise.all([
    loadBitmap(assets.bgUrl),
    loadBitmap(assets.deviceUrl),
    loadBitmap(assets.caseBaseUrl),
    loadBitmap(assets.textureUrl),
    loadBitmap(assets.edgesUrl),
    loadBitmap(assets.shadowUrl),
    loadBitmap(assets.maskUrl),
    loadBitmap(designUrl),
  ]);

  const outW = opts.outWidth ?? bg.width;
  const outH = opts.outHeight ?? bg.height;

  // 1) bbox no mask alpha (mask oriģinālajā izmērā)
  const tmp = document.createElement("canvas");
  tmp.width = mask.width;
  tmp.height = mask.height;
  const tctx = ensure2d(tmp);

  tctx.clearRect(0, 0, tmp.width, tmp.height);
  tctx.drawImage(mask, 0, 0);

  const bbox0 = alphaBBox(tctx.getImageData(0, 0, tmp.width, tmp.height), alphaThreshold);
  if (!bbox0) throw new Error("Mask bbox not found (alpha empty?)");

  // scale bbox uz output izmēru
  const sx = outW / mask.width;
  const sy = outH / mask.height;

  const bbox: BBox = {
    x: Math.round(bbox0.x * sx),
    y: Math.round(bbox0.y * sy),
    w: Math.round(bbox0.w * sx),
    h: Math.round(bbox0.h * sy),
  };

  // 2) base: bg + device + case + texture
  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = outW;
  baseCanvas.height = outH;
  const bctx = ensure2d(baseCanvas);

  bctx.clearRect(0, 0, outW, outH);
  bctx.drawImage(bg, 0, 0, outW, outH);
  bctx.drawImage(device, 0, 0, outW, outH);
  bctx.drawImage(caseBase, 0, 0, outW, outH);
  bctx.drawImage(texture, 0, 0, outW, outH);

  // 3) design layer: draw into bbox + clip by mask alpha
  const designCanvas = document.createElement("canvas");
  designCanvas.width = outW;
  designCanvas.height = outH;
  const dctx = ensure2d(designCanvas);

  dctx.clearRect(0, 0, outW, outH);

  const fit = coverFit(design.width, design.height, bbox.w, bbox.h);
  dctx.drawImage(design, bbox.x + fit.x, bbox.y + fit.y, fit.w, fit.h);

  // clip by mask alpha
  dctx.globalCompositeOperation = "destination-in";
  dctx.drawImage(mask, 0, 0, outW, outH);
  dctx.globalCompositeOperation = "source-over";

  // 4) output composition
  const outCanvas = document.createElement("canvas");
  outCanvas.width = outW;
  outCanvas.height = outH;
  const octx = ensure2d(outCanvas);

  octx.clearRect(0, 0, outW, outH);
  octx.drawImage(baseCanvas, 0, 0);
  octx.drawImage(designCanvas, 0, 0);
  octx.drawImage(edges, 0, 0, outW, outH);
  octx.drawImage(shadow, 0, 0, outW, outH);

  return outCanvas.toDataURL("image/png");
}