import { createContext, useContext, useState, ReactNode } from 'react';

interface WizardState {
  generatorType: 'print' | 'mockups' | null;
  product: string | null;
  brand: string | null;
  quantity: number | null;
  composition: string | null;
  designs: Array<{ id: number; image: string | null }>;
  selectedMockups: string[];
  finishedFiles: string[];
}

interface WizardContextType {
  state: WizardState;
  setGeneratorType: (type: 'print' | 'mockups') => void;
  setProduct: (product: string) => void;
  setBrand: (brand: string) => void;
  setQuantity: (quantity: number) => void;
  setComposition: (composition: string) => void;
  setDesigns: (designs: Array<{ id: number; image: string | null }>) => void;
  setSelectedMockups: (mockups: string[]) => void;
  setFinishedFiles: (files: string[]) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const initialState: WizardState = {
  generatorType: null,
  product: null,
  brand: null,
  quantity: null,
  composition: null,
  designs: [
    { id: 1, image: null },
    { id: 2, image: null },
    { id: 3, image: null },
    { id: 4, image: null },
    { id: 5, image: null },
  ],
  selectedMockups: [],
  finishedFiles: [],
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(initialState);

  const setGeneratorType = (type: 'print' | 'mockups') => {
    setState((prev) => ({ ...prev, generatorType: type }));
  };

  const setProduct = (product: string) => {
    setState((prev) => ({ ...prev, product }));
  };

  const setBrand = (brand: string) => {
    setState((prev) => ({ ...prev, brand }));
  };

  const setQuantity = (quantity: number) => {
    setState((prev) => ({ ...prev, quantity }));
  };

  const setComposition = (composition: string) => {
    setState((prev) => ({ ...prev, composition }));
  };

  const setDesigns = (designs: Array<{ id: number; image: string | null }>) => {
    setState((prev) => ({ ...prev, designs }));
  };

  const setSelectedMockups = (mockups: string[]) => {
    setState((prev) => ({ ...prev, selectedMockups: mockups }));
  };

  const setFinishedFiles = (files: string[]) => {
    setState((prev) => ({ ...prev, finishedFiles: files }));
  };

  const reset = () => {
    setState({
      generatorType: null,
      product: null,
      brand: null,
      quantity: null,
      composition: null,
      designs: [
        { id: 1, image: null },
        { id: 2, image: null },
        { id: 3, image: null },
        { id: 4, image: null },
        { id: 5, image: null },
      ],
      selectedMockups: [],
      finishedFiles: [],
    });
  };

  return (
    <WizardContext.Provider
      value={{
        state,
        setGeneratorType,
        setProduct,
        setBrand,
        setQuantity,
        setComposition,
        setDesigns,
        setSelectedMockups,
        setFinishedFiles,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}