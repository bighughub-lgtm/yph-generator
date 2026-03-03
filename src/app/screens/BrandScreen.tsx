import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from '../components/StepIndicator';

const steps = [
  { id: 'product', label: 'Product', path: '/product' },
  { id: 'brand', label: 'Brand\nor Color', path: '/brand' },
  { id: 'quantity', label: 'Quantity', path: '/quantity' },
  { id: 'composition', label: 'Composition', path: '/composition' },
  { id: 'designs', label: 'Designs', path: '/designs' },
  { id: 'mockups', label: 'Choose\nmockups', path: '/mockups' },
];

const brands = [
  { id: 'iphone', name: 'iPhone' },
  { id: 'samsung', name: 'SAMSUNG' },
  { id: 'pixel', name: 'Pixel' },
];

const colors = [
  { id: 'black', name: 'Black' },
  { id: 'white', name: 'White' },
  { id: 'blue', name: 'Blue' },
  { id: 'red', name: 'Red' },
  { id: 'green', name: 'Green' },
  { id: 'pink', name: 'Pink' },
];

export function BrandScreen() {
  const navigate = useNavigate();
  const { state, setBrand } = useWizard();
  const [selected, setSelected] = useState<string | null>(state.brand);

  // Check if product is MagSafe wallet (show colors) or phone case (show brands)
  const isMagSafeOnly = state.product === 'magsafe';
  const options = isMagSafeOnly ? colors : brands;
  const title = isMagSafeOnly ? 'Color' : 'Brand';

  // Reset selection when product type changes
  useEffect(() => {
    if (state.brand) {
      const isValidOption = options.some(opt => opt.id === state.brand);
      if (!isValidOption) {
        setSelected(null);
      }
    }
  }, [state.product, state.brand, options]);

  const handleContinue = () => {
    if (selected) {
      setBrand(selected);
      navigate('/quantity');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
        <h1 className="text-xl md:text-4xl mb-6 md:mb-12 text-gray-900 text-center font-semibold">{isMagSafeOnly ? 'Choose Color' : 'Choose Brand'}</h1>
        
        <StepIndicator steps={steps} currentStep={1} />

        <div className="w-full max-w-[1200px] mx-auto mb-6 md:mb-16">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
            <div className={`grid gap-4 md:gap-6 ${isMagSafeOnly ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelected(option.id)}
                  className={`bg-white border-2 rounded-xl px-4 md:px-8 py-8 md:py-12 text-sm md:text-xl text-gray-900 hover:border-gray-400 transition-colors font-medium ${
                    selected === option.id ? 'border-[#22c55e]' : 'border-gray-300'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/product')}
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