import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { Download, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function FinishedScreen() {
  const navigate = useNavigate();
  const { state, reset } = useWizard();
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Calculate total mockups based on selected mockups and designs
  const designCount = state.designs.filter(d => d.image).length;
  const mockupCount = state.selectedMockups.length;
  const totalMockups = Math.max(designCount * mockupCount, 12); // At least 12 for demo

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadedCount((prev) => {
        if (prev >= totalMockups) {
          clearInterval(interval);
          setLoading(false);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [totalMockups]);

  const handleDownload = () => {
    // Simulate download
    alert('Mockups downloaded successfully!');
  };

  const handleGenerateNew = () => {
    reset();
    navigate('/');
  };

  const mockupFiles = Array.from({ length: totalMockups }, (_, i) => ({
    id: i + 1,
    color: i === 0 ? '#f4c2c2' : i === 1 ? '#e0e0e0' : '#f0f0f0',
  }));

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-8 md:py-16">
        <h1 className="text-2xl md:text-4xl mb-8 md:mb-16 text-gray-900 text-center">Finished Files</h1>

        <div className="w-full max-w-[1200px] mx-auto mb-8 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {mockupFiles.map((file) => (
                <div
                  key={file.id}
                  className="aspect-square rounded-lg flex items-center justify-center relative"
                  style={{ backgroundColor: file.color }}
                >
                  {loading && file.id > loadedCount ? (
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {file.id === 1 && (
                        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="bg-[#2b2b2b] text-white rounded-full px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download
            </button>
            <button
              onClick={handleGenerateNew}
              disabled={loading}
              className="bg-white border-2 border-gray-300 rounded-full px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate new
            </button>
          </div>
          <div className="text-gray-600 text-sm md:text-base">
            {loadedCount}/{totalMockups}
          </div>
        </div>
      </div>
    </div>
  );
}