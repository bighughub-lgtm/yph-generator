// src/app/screens/DesignsScreen.tsx
import { useNavigate } from 'react-router';
import { useState, useRef } from 'react';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from '../components/StepIndicator';
import { ImagePlus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { uploadToCloudinary } from '../lib/cloudinary';

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
  preview: string | null; // base64 preview (UI ātrumam)
  url: string | null;     // Cloudinary secure_url (īstā vērtība renderim)
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
  onUpload: (index: number, preview: string, url: string) => void;
  onRemove: (index: number) => void;
  moveSlot: (dragIndex: number, hoverIndex: number) => void;
  onMultipleUpload: (startIndex: number, items: { preview: string; url: string }[]) => void;
  onInvalidSize: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'design',
    item: { id: slot.id, index },
    canDrag: !!slot.preview,
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
      const isMobile = window.innerWidth < 768;

      // Mobile: skip validation
      if (isMobile) {
        resolve(true);
        return;
      }

      const img = new Image();
      img.onload = () => resolve(img.width === 750 && img.height === 1590);
      img.onerror = () => resolve(false);
      img.src = imageData;
    });
  };

  const readPreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    try {
      setUploading(true);

      if (fileArray.length === 1) {
        const file = fileArray[0];

        const preview = await readPreview(file);
        const isValid = await validateImageSize(preview);

        if (!isValid) {
          onInvalidSize();
          return;
        }

        const url = await uploadToCloudinary(file);
        onUpload(index, preview, url);
      } else {
        const items: { preview: string; url: string }[] = [];
        let hasInvalidSize = false;

        for (const file of fileArray.slice(0, 5)) {
          const preview = await readPreview(file);
          const isValid = await validateImageSize(preview);

          if (!isValid) {
            hasInvalidSize = true;
            continue;
          }

          const url = await uploadToCloudinary(file);
          items.push({ preview, url });
        }

        if (hasInvalidSize) onInvalidSize();
        if (items.length > 0) onMultipleUpload(index, items);
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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

      {slot.preview ? (
        <div className={`relative group ${isOver ? 'ring-2 ring-[#22c55e]' : ''}`}>
          <div className="aspect-[9/16] bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative">
            <img
              src={slot.preview}
              alt={`Design ${slot.id}`}
              className="w-full h-full object-cover"
            />

            {uploading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          <button
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            disabled={uploading}
            title="Remove"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aspect-[9/16] w-full bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors relative"
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
          )}
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

export function DesignsScreen() {
  const navigate = useNavigate();
  const { state, setDesigns } = useWizard();

  const [slots, setSlots] = useState<DesignSlot[]>(
    state.designs.length > 0
      ? state.designs.map((url, idx) => ({ id: idx + 1, preview: url, url }))
      : Array.from({ length: 5 }, (_, i) => ({ id: i + 1, preview: null, url: null }))
  );

  const [showError, setShowError] = useState(false);

  const handleUpload = (index: number, preview: string, url: string) => {
    const newSlots = [...slots];
    newSlots[index].preview = preview;
    newSlots[index].url = url;
    setSlots(newSlots);
  };

  const handleRemove = (index: number) => {
    const newSlots = [...slots];
    newSlots[index].preview = null;
    newSlots[index].url = null;
    setSlots(newSlots);
  };

  const handleDeleteAll = () => {
    setSlots(Array.from({ length: 5 }, (_, i) => ({ id: i + 1, preview: null, url: null })));
  };

  const moveSlot = (dragIndex: number, hoverIndex: number) => {
    const newSlots = [...slots];
    const dragSlot = newSlots[dragIndex];
    newSlots.splice(dragIndex, 1);
    newSlots.splice(hoverIndex, 0, dragSlot);
    setSlots(newSlots);
  };

  const handleMultipleUpload = (startIndex: number, items: { preview: string; url: string }[]) => {
    const newSlots = [...slots];
    items.forEach((item, idx) => {
      const targetIndex = startIndex + idx;
      if (targetIndex < newSlots.length) {
        newSlots[targetIndex].preview = item.preview;
        newSlots[targetIndex].url = item.url;
      }
    });
    setSlots(newSlots);
  };

  const handleInvalidSize = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleContinue = () => {
    const urls = slots.map((s) => s.url).filter((u) => u !== null) as string[];
    if (urls.length > 0) {
      // Wizard state glabā Cloudinary URL (nevis base64)
      setDesigns(urls);
      navigate('/mockups');
    }
  };

  const hasImages = slots.some((slot) => slot.url !== null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <div className="flex-1 flex flex-col px-4 md:px-8 py-6 md:py-16">
          <h1 className="text-xl md:text-4xl mb-6 md:mb-12 text-gray-900 text-center font-semibold">
            Upload Designs
          </h1>

          <StepIndicator steps={steps} currentStep={4} />

          <div className="w-full max-w-[1200px] mx-auto mb-6 md:mb-16">
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {slots.map((slot, index) => (
                  <DesignSlotComponent
                    key={slot.id}
                    slot={slot}
                    index={index}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                    moveSlot={moveSlot}
                    onMultipleUpload={handleMultipleUpload}
                    onInvalidSize={handleInvalidSize}
                  />
                ))}
              </div>

              {hasImages && (
                <div className="mt-6 md:mt-8 flex justify-end">
                  <button
                    onClick={handleDeleteAll}
                    className="bg-white border-2 border-gray-300 text-gray-900 rounded-full px-4 md:px-6 py-2 text-sm md:text-base hover:bg-[#2b2b2b] hover:text-white hover:border-[#2b2b2b] transition-colors"
                  >
                    Delete all
                  </button>
                </div>
              )}
            </div>
          </div>

          {showError && (
            <div className="flex items-center gap-2 text-red-600 justify-center mt-4 text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>The preferred image size is 750x1590 pixels.</span>
            </div>
          )}

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
    </DndProvider>
  );
}