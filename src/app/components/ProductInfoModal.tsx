import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ProductInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function ProductInfoModal({ isOpen, onClose, productName }: ProductInfoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl mb-4">{productName}</h2>

        <div className="space-y-3 text-sm">
          <div>
            <strong>Material:</strong> Flexible, lightweight TPU with direct UV print.
          </div>
          
          <div>
            <strong>Design requirements:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>750 × 1590 px (vertical)</li>
              <li>RGB color mode</li>
              <li>Full bleed (no white edges)</li>
              <li>Keep text 5-8 mm from edges & camera cutout</li>
              <li>Avoid very thin lines</li>
            </ul>
          </div>

          <div>
            <strong>Notes:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Print is flat (no texture)</li>
              <li>Dark designs may appear slightly lighter on transparent cases</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded mt-4">
            <div className="aspect-video bg-black rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GktVs9-Fvxo"
                title="Product Information Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-4">
            <a href="#" className="text-blue-600 hover:underline">Learn more - FAQ</a>
            <br />
            <a href="#" className="text-blue-600 hover:underline">View Files in Google Drive: Mockups and Guidelines</a>
          </div>
        </div>
      </div>
    </div>
  );
}