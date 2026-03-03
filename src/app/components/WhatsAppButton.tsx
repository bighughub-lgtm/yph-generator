import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </button>
  );
}
