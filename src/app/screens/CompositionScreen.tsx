import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from '../components/StepIndicator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const steps = [
  { id: 'product', label: 'Product', path: '/product' },
  { id: 'brand', label: 'Brand\nor Color', path: '/brand' },
  { id: 'quantity', label: 'Quantity', path: '/quantity' },
  { id: 'composition', label: 'Composition', path: '/composition' },
  { id: 'designs', label: 'Designs', path: '/designs' },
  { id: 'mockups', label: 'Choose\nmockups', path: '/mockups' },
];

const compositions = [
  { id: '1', image: 'https://catalog.yourprinthouse.eu/catalog/test/48/design.png' },
  { id: '2', image: 'https://catalog.yourprinthouse.eu/catalog/test/49/design.png' },
  { id: '3', image: 'https://catalog.yourprinthouse.eu/catalog/test/31/design.png' },
  { id: '4', image: 'https://catalog.yourprinthouse.eu/catalog/test/32/design.png' },
  { id: '5', image: 'https://catalog.yourprinthouse.eu/catalog/test/34/design.png' },
  { id: '6', image: 'https://catalog.yourprinthouse.eu/catalog/test/35/design.png' },
];

export function CompositionScreen() {
  const navigate = useNavigate();
  const { state, setComposition } = useWizard();
  const [selected, setSelected] = useState<string | null>(state.composition);

  const handleContinue = () => {
    if (selected) {
      setComposition(selected);
      navigate('/designs');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
        <h1 className="text-xl md:text-4xl mb-6 md:mb-12 text-gray-900 text-center font-semibold">Composition</h1>
        
        <StepIndicator steps={steps} currentStep={3} />

        <div className="w-full max-w-[1200px] mx-auto mb-6 md:mb-16 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {compositions.map((composition) => (
                <button
                  key={composition.id}
                  onClick={() => setSelected(composition.id)}
                  className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 hover:border-gray-400 transition-colors ${
                    selected === composition.id ? 'border-[#22c55e]' : 'border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={composition.image}
                    alt={`Composition ${composition.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/quantity')}
            className="bg-white border-2 border-gray-300 rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="bg-[#2b2b2b] text-white rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}