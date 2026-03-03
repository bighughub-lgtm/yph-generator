import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useWizard } from '../context/WizardContext';

export function StartScreen() {
  const navigate = useNavigate();
  const { setGeneratorType } = useWizard();
  const [selected, setSelected] = useState<'print' | 'mockups' | null>(null);

  const handleSelection = (type: 'print' | 'mockups') => {
    setSelected(type);
    setGeneratorType(type);
  };

  const handleContinue = () => {
    if (selected === 'mockups') {
      navigate('/product');
    } else if (selected === 'print') {
      // For print files, navigate to product or show appropriate screen
      navigate('/product');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col items-center px-8 pt-8">
        <h1 className="text-4xl mb-12 text-gray-900">Mockup Generator</h1>
        
        <div className="flex gap-6 mb-12">
          <button
            onClick={() => handleSelection('print')}
            className={`bg-white border-2 rounded-lg px-16 py-8 text-xl text-gray-900 hover:border-gray-400 transition-colors ${
              selected === 'print' ? 'border-[#22c55e]' : 'border-gray-300'
            }`}
          >
            Create Print files
          </button>
          <button
            onClick={() => handleSelection('mockups')}
            className={`bg-white border-2 rounded-lg px-16 py-8 text-xl text-gray-900 hover:border-gray-400 transition-colors ${
              selected === 'mockups' ? 'border-[#22c55e]' : 'border-gray-300'
            }`}
          >
            Create Mockups
          </button>
        </div>

        <div className="max-w-md w-full">
          <button 
            onClick={handleContinue}
            disabled={!selected}
            className="w-full bg-[#2b2b2b] text-white rounded-full px-8 py-3 hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}