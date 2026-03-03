// src/app/screens/FinishedScreen.tsx
import { useNavigate } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWizard } from "../context/WizardContext";
import { Download, Loader2, Check, AlertCircle } from "lucide-react";
import { renderMockupToDataUrl } from "../lib/renderMockup";
import { downloadPngsAsZip } from "../lib/zipDownload";
import { TEMPLATE_ASSETS } from "../lib/mockupTemplates";

type ResultItem = {
  id: string;
  templateId: string;
  designUrl: string;
  pngDataUrl: string;
  designIndex: number;
  templateIndex: number;
};

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9\-_]+/gi, "_").replace(/^_+|_+$/g, "");
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function FinishedScreen() {
  const navigate = useNavigate();
  const { state, reset } = useWizard();

  const designUrls = useMemo(() => {
    return (state.designs ?? []).filter(Boolean) as string[];
  }, [state.designs]);

  const templateIds = useMemo(() => {
    return (state.selectedMockups ?? []).filter(Boolean) as string[];
  }, [state.selectedMockups]);

  const totalToGenerate = Math.max(designUrls.length * templateIds.length, 0);

  const [loading, setLoading] = useState(true);
  const [generated, setGenerated] = useState(0);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);
        setResults([]);
        setGenerated(0);

        if (designUrls.length === 0) {
          setLoading(false);
          setError("No designs found. Go back and upload designs.");
          return;
        }
        if (templateIds.length === 0) {
          setLoading(false);
          setError("No mockups selected. Go back and select mockups.");
          return;
        }

        // pārbaude: vai visiem template ir assets
        const missing = templateIds.filter((id) => !TEMPLATE_ASSETS[id]);
        if (missing.length > 0) {
          setLoading(false);
          setError(
            `Missing assets for template IDs: ${missing.join(
              ", "
            )}. Add them to src/app/lib/mockupTemplates.ts`
          );
          return;
        }

        const out: ResultItem[] = [];

        for (let d = 0; d < designUrls.length; d++) {
          for (let m = 0; m < templateIds.length; m++) {
            if (cancelledRef.current) return;

            const designUrl = designUrls[d];
            const templateId = templateIds[m];
            const assets = TEMPLATE_ASSETS[templateId];

            const pngDataUrl = await renderMockupToDataUrl(assets, designUrl, {
              alphaThreshold: 1,
            });

            out.push({
              id: `d${d}_m${m}`,
              templateId,
              designUrl,
              pngDataUrl,
              designIndex: d,
              templateIndex: m,
            });

            setResults([...out]);
            setGenerated(out.length);
          }
        }

        setLoading(false);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || String(e));
        setLoading(false);
      }
    })();

    return () => {
      cancelledRef.current = true;
    };
  }, [designUrls, templateIds]);

  const handleDownloadZip = async () => {
    if (results.length === 0) return;

    const files = results.map((r) => {
      const designPart = `design${pad2(r.designIndex + 1)}`;
      const tmplPart = `template${pad2(r.templateIndex + 1)}_${safeFileName(
        r.templateId
      )}`;
      const filename = `${designPart}_${tmplPart}.png`;

      return { filename, dataUrl: r.pngDataUrl };
    });

    await downloadPngsAsZip(files, "mockups.zip");
  };

  const handleGenerateNew = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
        <div className="flex items-center justify-center mb-6 md:mb-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#22c55e] rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>

        <h1 className="text-xl md:text-4xl mb-6 md:mb-6 text-gray-900 text-center font-semibold">
          {loading ? "Generating mockups…" : "Mockup Generation Complete!"}
        </h1>

        <div className="text-center text-gray-600 mb-6">
          {generated}/{totalToGenerate || 0}
        </div>

        {error && (
          <div className="w-full max-w-[1200px] mx-auto mb-6 bg-white border border-red-200 rounded-xl p-4 text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <div className="text-sm md:text-base">{error}</div>
          </div>
        )}

        <div className="w-full max-w-[1200px] mx-auto mb-6 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: Math.max(totalToGenerate, 12) }, (_, i) => {
                const item = results[i];

                return (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative"
                  >
                    {!item ? (
                      <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400 animate-spin" />
                    ) : (
                      <img
                        src={item.pngDataUrl}
                        alt={`Mockup ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <button
              onClick={handleDownloadZip}
              disabled={loading || results.length === 0}
              className="bg-[#2b2b2b] text-white rounded-full px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download ZIP
            </button>

            <button
              onClick={handleGenerateNew}
              disabled={loading}
              className="bg-white border-2 border-gray-300 rounded-full px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate new
            </button>
          </div>

          <div className="text-gray-600 text-sm md:text-base flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />}
            <span>
              {generated}/{totalToGenerate || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}