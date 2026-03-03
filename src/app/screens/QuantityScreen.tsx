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

const quantities = [
  { id: 1, count: 1, image: 'https://catalog.yourprinthouse.eu/generator/quantity0i.png' },
  { id: 3, count: 3, image: 'https://catalog.yourprinthouse.eu/generator/quantity1i.png' },
  { id: 5, count: 5, image: 'https://catalog.yourprinthouse.eu/generator/quantity2i.png' },
];

export function QuantityScreen() {
  const navigate = useNavigate();
  const { state, setQuantity } = useWizard();
  const [selected, setSelected] = useState<number | null>(state.quantity);

  const handleContinue = () => {
    if (selected) {
      setQuantity(selected);
      navigate('/composition');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
        <h1 className="text-xl md:text-4xl mb-6 md:mb-12 text-gray-900 text-center font-semibold">Quantity</h1>
        
        <StepIndicator steps={steps} currentStep={2} />

        <div className="w-full max-w-[1200px] mx-auto mb-6 md:mb-16">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {quantities.map((qty) => (
                <button
                  key={qty.id}
                  onClick={() => setSelected(qty.count)}
                  className={`bg-white border-2 rounded-xl p-3 md:p-6 hover:border-gray-400 transition-colors ${
                    selected === qty.count ? 'border-[#22c55e]' : 'border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={qty.image}
                      alt={`${qty.count} phone${qty.count > 1 ? 's' : ''}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/brand')}
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