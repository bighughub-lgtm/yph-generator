import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useWizard } from '../context/WizardContext';

interface Step {
  id: string;
  label: string;
  path: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const navigate = useNavigate();
  const { state } = useWizard();

  const handleStepClick = (index: number, path: string) => {
    // Only allow clicking on completed steps
    if (index < currentStep) {
      navigate(path);
    }
  };

  // Dynamically adjust the brand step label based on product
  const adjustedSteps = steps.map(step => {
    if (step.id === 'brand') {
      const isMagSafeOnly = state.product === 'magsafe';
      return {
        ...step,
        label: isMagSafeOnly ? 'Color' : 'Brand'
      };
    }
    return step;
  });

  return (
    <div className="flex items-start justify-center gap-4 mb-12">
      {adjustedSteps.map((step, index) => (
        <div key={step.id} className="flex items-start">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleStepClick(index, step.path)}
              disabled={index >= currentStep}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#1f1f1f]'
                  : index === currentStep
                  ? 'bg-[#2b2b2b] text-white cursor-default'
                  : 'bg-gray-300 text-gray-500 cursor-default'
              } transition-colors`}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-current" />
              )}
            </button>
            <span
              className={`mt-2 text-sm text-center whitespace-pre-line leading-tight ${
                index <= currentStep ? 'text-gray-900' : 'text-gray-400'
              }`}
              style={{ minHeight: '2.5rem' }}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-2 mt-6 ${
                index < currentStep ? 'bg-[#2b2b2b]' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}