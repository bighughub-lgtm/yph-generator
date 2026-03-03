import { useNavigate } from 'react-router';
import { useState, useRef } from 'react';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from '../components/StepIndicator';
import { ImagePlus, Trash2, AlertCircle } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const steps = [
  { id: 'product', label: 'Product', path: '/product' },
  { id: 'brand', label: 'Brand\nor Color', path: '/brand' },
  { id: 'quantity', label: 'Quantity', path: '/quantity' },
  { id: 'composition', label: 'Composition', path: '/composition' },
  { id: 'designs', label: 'Designs', path: '/designs' },
  { id: 'mockups', label: 'Choose\nmockups', path: '/mockups' },
];

interface DesignSlot {
  id: number;
  image: string | null;
}

interface DragItem {
  index: number;
  id: number;
}

function DesignSlotComponent({
  slot,
  index,
  onUpload,
  onRemove,
  moveSlot,
  onMultipleUpload,
  onInvalidSize,
}: {
  slot: DesignSlot;
  index: number;
  onUpload: (index: number, image: string) => void;
  onRemove: (index: number) => void;
  moveSlot: (dragIndex: number, hoverIndex: number) => void;
  onMultipleUpload: (startIndex: number, images: string[]) => void;
  onInvalidSize: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'design',
    item: { id: slot.id, index },
    canDrag: !!slot.image,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'design',
    hover: (item: DragItem) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSlot(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const validateImageSize = (imageData: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width === 750 && img.height === 1590);
      };
      img.onerror = () => resolve(false);
      img.src = imageData;
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    if (fileArray.length === 1) {
      // Single file - use original behavior
      const file = fileArray[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = event.target?.result as string;
        const isValid = await validateImageSize(imageData);
        
        if (isValid) {
          onUpload(index, imageData);
        } else {
          onInvalidSize();
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Multiple files - distribute across slots
      const images: string[] = [];
      let loadedCount = 0;
      let hasInvalidSize = false;
      
      fileArray.slice(0, 5).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageData = event.target?.result as string;
          const isValid = await validateImageSize(imageData);
          
          if (isValid) {
            images[fileIndex] = imageData;
          } else {
            hasInvalidSize = true;
          }
          
          loadedCount++;
          
          // Once all files are loaded, update slots
          if (loadedCount === Math.min(fileArray.length, 5)) {
            if (hasInvalidSize) {
              onInvalidSize();
            }
            // Only upload valid images
            const validImages = images.filter(img => img);
            if (validImages.length > 0) {
              onMultipleUpload(index, validImages);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div ref={ref} className="relative" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      
      {slot.image ? (
        <div className={`relative group ${isOver ? 'ring-2 ring-[#22c55e]' : ''}`}>
          <div className="aspect-[9/16] bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            <img src={slot.image} alt={`Design ${slot.id}`} className="w-full h-full object-cover" />
          </div>
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aspect-[9/16] w-full bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
        >
          <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
        </button>
      )}
      <div className="flex justify-center mt-2">
        <div className="w-8 h-8 bg-[#2b2b2b] text-white rounded-full flex items-center justify-center text-sm">
          {index + 1}
        </div>
      </div>
    </div>
  );
}

export function DesignsScreenContent() {
  const navigate = useNavigate();
  const { state, setDesigns } = useWizard();
  
  // Get quantity from state, default to 5 if not set
  const quantity = state.quantity || 5;
  
  const [designs, setDesignsState] = useState<DesignSlot[]>(() => {
    // Initialize designs based on quantity
    if (state.designs.length > 0 && state.designs.length === quantity) {
      return state.designs;
    }
    return Array.from({ length: quantity }, (_, i) => ({ id: i + 1, image: null }));
  });
  const [showError, setShowError] = useState(false);

  const handleUpload = (index: number, image: string) => {
    const newDesigns = [...designs];
    newDesigns[index].image = image;
    setDesignsState(newDesigns);
    setShowError(false);
  };

  const handleRemove = (index: number) => {
    const newDesigns = [...designs];
    newDesigns[index].image = null;
    setDesignsState(newDesigns);
  };

  const moveSlot = (dragIndex: number, hoverIndex: number) => {
    const newDesigns = [...designs];
    // Swap only the images, not the entire slots (to keep numbers in place)
    const dragImage = newDesigns[dragIndex].image;
    newDesigns[dragIndex].image = newDesigns[hoverIndex].image;
    newDesigns[hoverIndex].image = dragImage;
    setDesignsState(newDesigns);
  };

  const handleMultipleUpload = (startIndex: number, images: string[]) => {
    const newDesigns = [...designs];
    images.forEach((image, index) => {
      const targetIndex = startIndex + index;
      // Only update if the target index is within bounds
      if (targetIndex < newDesigns.length && newDesigns[targetIndex]) {
        newDesigns[targetIndex].image = image;
      }
    });
    setDesignsState(newDesigns);
    setShowError(false);
  };

  const handleDeleteAll = () => {
    const newDesigns = designs.map(slot => ({ ...slot, image: null }));
    setDesignsState(newDesigns);
  };

  const handleContinue = () => {
    const hasDesigns = designs.some((d) => d.image);
    if (!hasDesigns) {
      setShowError(true);
      return;
    }
    setDesigns(designs);
    navigate('/mockups');
  };

  const hasAnyDesigns = designs.some((d) => d.image);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-1 flex flex-col px-4 md:px-8 py-8 md:py-16">
        <h1 className="text-2xl md:text-4xl mb-8 md:mb-12 text-gray-900 text-center">Upload Design Files</h1>
        
        <StepIndicator steps={steps} currentStep={4} />

        <div className="w-full max-w-[1200px] mx-auto mb-8 md:mb-16">
          {hasAnyDesigns && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDeleteAll}
                className="text-sm text-gray-900 hover:bg-[#2b2b2b] hover:text-white transition-colors px-3 py-1.5 rounded-full"
              >
                Delete all
              </button>
            </div>
          )}
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className={`grid gap-4 ${
              quantity === 1 
                ? 'grid-cols-1 max-w-[200px] mx-auto' 
                : quantity === 3 
                  ? 'grid-cols-2 sm:grid-cols-3 max-w-[650px] mx-auto' 
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
            }`}>
              {designs.map((slot, index) => (
                <DesignSlotComponent
                  key={slot.id}
                  slot={slot}
                  index={index}
                  onUpload={handleUpload}
                  onRemove={handleRemove}
                  moveSlot={moveSlot}
                  onMultipleUpload={handleMultipleUpload}
                  onInvalidSize={() => setShowError(true)}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ImagePlus className="w-4 h-4" />
                <span>Click to upload</span>
              </div>
              <span className="hidden sm:inline">↔</span>
              <span>Drag to swap</span>
              <span className="hidden sm:inline">⊗</span>
              <span>Hover to delete</span>
            </div>
          </div>

          {showError && (
            <div className="flex items-center gap-2 text-red-600 justify-center mt-4 text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>The preferred image size is 750x1590 pixels.</span>
            </div>
          )}
        </div>

        <div className="w-full max-w-[1200px] mx-auto flex justify-between">
          <button
            onClick={() => navigate('/composition')}
            className="bg-white border-2 border-gray-300 rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="bg-[#2b2b2b] text-white rounded-full px-4 md:px-8 py-2 md:py-3 text-sm md:text-base hover:bg-[#1f1f1f] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export function DesignsScreen() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DesignsScreenContent />
    </DndProvider>
  );
}