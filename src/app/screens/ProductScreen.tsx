import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from '../components/StepIndicator';
import { ProductInfoModal } from '../components/ProductInfoModal';
import { HelpCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const steps = [
  { id: 'product', label: 'Product', path: '/product' },
  { id: 'brand', label: 'Brand\nor Color', path: '/brand' },
  { id: 'quantity', label: 'Quantity', path: '/quantity' },
  { id: 'composition', label: 'Composition', path: '/composition' },
  { id: 'designs', label: 'Designs', path: '/designs' },
  { id: 'mockups', label: 'Choose\nmockups', path: '/mockups' },
];

const products = [
  { id: 'tpu', name: 'TPU / Gel Phone Case', image: 'https://res.cloudinary.com/dknosgyfo/image/upload/v1772540737/x1_v8s9wl.png' },
  { id: 'tough', name: 'Tough Cases', image: 'https://res.cloudinary.com/dknosgyfo/image/upload/v1772540737/x2_elcyot.png' },
  { id: 'magsafe', name: 'Magsafe wallet', image: 'https://res.cloudinary.com/dknosgyfo/image/upload/v1772540737/x3_xadug4.png' },
  { id: 'tpu-magsafe', name: 'TPU / Gel + Magsafe', image: 'https://res.cloudinary.com/dknosgyfo/image/upload/v1772541015/x4_yzq7y9.png' },
  { id: 'tough-magsafe', name: 'Tough Cases + Magsafe', image: 'https://res.cloudinary.com/dknosgyfo/image/upload/v1772541015/x5_m5cm2r.png' },
];

export function ProductScreen() {
  const navigate = useNavigate();
  const { state, setProduct } = useWizard();
  const [selected, setSelected] = useState<string | null>(state.product);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelected(productId);
    // Update context immediately so StepIndicator can react
    setProduct(productId);
  };

  const handleContinue = () => {
    if (selected) {
      setProduct(selected);
      navigate('/brand');
    }
  };

  const selectedProduct = products.find(p => p.id === showInfo);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-8 md:py-16">
        <h1 className="text-2xl md:text-4xl mb-8 md:mb-12 text-gray-900 text-center">Product</h1>
        
        <StepIndicator steps={steps} currentStep={0} />

        <div className="w-full max-w-[1200px] mx-auto mb-8 md:mb-16 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    onClick={() => handleProductSelect(product.id)}
                    className={`group w-full bg-white border-2 rounded-lg p-4 md:p-6 transition-colors ${
                      selected === product.id ? 'border-[#22c55e] border-[3px]' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs md:text-sm text-gray-900">{product.name}</span>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowInfo(showInfo === product.id ? null : product.id);
                        }}
                        className="relative cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowInfo(showInfo === product.id ? null : product.id);
                          }
                        }}
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-[#6E6E6E] flex items-center justify-center bg-white group-hover:border-[#ff0000] group-hover:bg-[#ff0000] transition-colors">
                          <span className="text-[#6E6E6E] group-hover:text-white text-xs font-bold transition-colors">?</span>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/')}
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

      <ProductInfoModal
        isOpen={!!showInfo}
        onClose={() => setShowInfo(null)}
        productName={selectedProduct?.name || ''}
      />
    </div>
  );
}