import { Mail, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#2b2b2b] text-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-xl">YPH</div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white">Generator</a>
            <a href="#" className="text-gray-400 hover:text-white">Orders</a>
            <a href="#" className="text-gray-400 hover:text-white">Help</a>
            <a href="#" className="text-gray-400 hover:text-white">Analytics</a>
            <a href="#" className="text-gray-400 hover:text-white">APP</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">
            <Mail className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <User className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400">Logout (yphebayuk)</span>
          <div className="flex gap-2 text-sm text-gray-400">
            <span>LV</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
