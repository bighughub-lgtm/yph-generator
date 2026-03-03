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

const mockupTemplates = [
  { id: '1', image: 'https://catalog.yourprinthouse.eu/catalog/test/38/design.png' },
  { id: '2', image: 'https://catalog.yourprinthouse.eu/catalog/test/39/design.png' },
  { id: '3', image: 'https://catalog.yourprinthouse.eu/catalog/test/40/design.png' },
  { id: '4', image: 'https://catalog.yourprinthouse.eu/catalog/test/41/design.png' },
  { id: '5', image: 'https://catalog.yourprinthouse.eu/catalog/test/42/design.png' },
  { id: '6', image: 'https://catalog.yourprinthouse.eu/catalog/test/43/design.png' },
  { id: '7', image: 'https://catalog.yourprinthouse.eu/catalog/test/44/design.png' },
  { id: '8', image: 'https://catalog.yourprinthouse.eu/catalog/test/45/design.png' },
  { id: '9', image: 'https://catalog.yourprinthouse.eu/catalog/test/46/design.png' },
  { id: '10', image: 'https://catalog.yourprinthouse.eu/catalog/test/47/design.png' },
  { id: '11', image: 'https://catalog.yourprinthouse.eu/catalog/test/52/design.png' },
  { id: '12', image: 'https://catalog.yourprinthouse.eu/catalog/test/53/design.png' },
  { id: '13', image: 'https://catalog.yourprinthouse.eu/catalog/test/54/design.png' },
  { id: '14', image: 'https://catalog.yourprinthouse.eu/catalog/test/55/design.png' },
  { id: '15', image: 'https://catalog.yourprinthouse.eu/catalog/test/56/design.png' },
  { id: '16', image: 'https://catalog.yourprinthouse.eu/catalog/test/2/design.png' },
];

export function MockupsScreen() {
  const navigate = useNavigate();
  const { state, setSelectedMockups } = useWizard();
  const [selected, setSelected] = useState<string[]>(state.selectedMockups);

  const toggleMockup = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setSelectedMockups(selected);
    navigate('/finished');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
        <h1 className="text-xl md:text-4xl mb-6 md:mb-12 text-gray-900 text-center font-semibold">Choose Mockups</h1>
        
        <StepIndicator steps={steps} currentStep={5} />

        <div className="w-full max-w-[1200px] mx-auto mb-6 md:mb-16 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {mockupTemplates.map((mockup) => (
                <button
                  key={mockup.id}
                  onClick={() => toggleMockup(mockup.id)}
                  className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 hover:border-gray-400 transition-colors ${
                    selected.includes(mockup.id) ? 'border-[#22c55e]' : 'border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={mockup.image}
                    alt={`Mockup ${mockup.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/designs')}
            className="bg-white border-2 border-gray-300 rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleGenerate}
            disabled={selected.length === 0}
            className="bg-[#2b2b2b] text-white rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}