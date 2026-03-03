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
    <>
      {/* Desktop horizontal version */}
      <div className="hidden lg:flex items-start justify-center gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto px-2">
        {adjustedSteps.map((step, index) => (
          <div key={step.id} className="flex items-start flex-shrink-0">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(index, step.path)}
                disabled={index >= currentStep}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#1f1f1f]'
                    : index === currentStep
                    ? 'bg-[#2b2b2b] text-white cursor-default'
                    : 'bg-gray-300 text-gray-500 cursor-default'
                } transition-colors`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-current" />
                )}
              </button>
              <span
                className={`mt-2 text-xs md:text-sm text-center whitespace-pre-line leading-tight ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
                style={{ minHeight: '2.5rem' }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-1 mx-1 md:mx-2 mt-5 md:mt-6 ${
                  index < currentStep ? 'bg-[#2b2b2b]' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile & Tablet vertical version */}
      <div className="lg:hidden mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          {adjustedSteps.map((step, index) => (
            <div key={step.id}>
              <button
                onClick={() => handleStepClick(index, step.path)}
                disabled={index >= currentStep}
                className="w-full flex items-center gap-3 py-2"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border ${
                    index < currentStep
                      ? 'bg-[#2b2b2b] border-[#2b2b2b] text-white'
                      : index === currentStep
                      ? 'bg-[#2b2b2b] border-[#2b2b2b] text-white'
                      : 'bg-transparent border-gray-300 text-gray-400'
                  } transition-colors`}
                >
                  {index < currentStep ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : index === currentStep ? (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  ) : (
                    <div className="w-2 h-2 rounded-full border border-current" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div
                    className={`text-sm font-semibold ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    Step {index + 1}
                  </div>
                  <div
                    className={`text-xs ${
                      index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {step.label.replace('\\n', ' ')}
                  </div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-px h-4 ml-3.5 ${
                    index < currentStep ? 'bg-[#2b2b2b]' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}