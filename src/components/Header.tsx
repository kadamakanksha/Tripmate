import React from 'react';

interface HeaderProps {
  activeTab: 'plan' | 'itinerary' | 'saved' | 'profile';
  setActiveTab: (tab: 'plan' | 'itinerary' | 'saved' | 'profile') => void;
  savedCount: number;
  profilePicUrl: string;
  hasItinerary: boolean;
  onOpenNotifications?: () => void;
}

export const TripMateLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#006a61" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="30" fill="url(#logoGrad)" />
    {/* Stylized navigation compass arrow */}
    <path
      d="M48 28L68 68L48 54L28 68L48 28Z"
      fill="white"
    />
    {/* Orbital locator circle & accent streak */}
    <circle cx="68" cy="33" r="8" fill="#38bdf8" />
    <path
      d="M67 33C71 37 77 40 81 39"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  profilePicUrl,
  hasItinerary,
  onOpenNotifications,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#bfc7d2]/30 shadow-[0_1px_8px_rgba(2,132,199,0.05)] pt-safe">
      <div className="max-w-6xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand zone */}
        <div
          onClick={() => setActiveTab('plan')}
          className="flex items-center gap-2.5 cursor-pointer select-none group min-w-0"
        >
          <TripMateLogo className="w-8 h-8 rounded-xl shadow-xs transition-transform group-hover:scale-105" />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[19px] tracking-tight text-[#131b2e] font-bold truncate">
              TripMate AI
            </span>
            <span className="bg-[#86f2e4] text-[#006f66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
              AI Beta
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#eaedff]/60 p-1 rounded-2xl border border-[#bfc7d2]/20">
          <button
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'plan'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Plan Trip
          </button>
          <button
            onClick={() => hasItinerary && setActiveTab('itinerary')}
            disabled={!hasItinerary}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'itinerary'
                ? 'bg-white text-[#006194] shadow-xs'
                : hasItinerary
                ? 'text-[#3f4850] hover:text-[#131b2e]'
                : 'text-[#bfc7d2] cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">route</span>
            Itinerary
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_heart</span>
            Saved Trips
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] bg-[#006194] text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_circle</span>
            Settings
          </button>
        </nav>

        {/* Right actions: Notifications & User profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#006194] hover:bg-[#eaedff] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#006194]" />
          </button>

          <button
            aria-label="Profile"
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full overflow-hidden p-0.5 ring-2 ring-transparent hover:ring-[#006194]/40 transition-all flex items-center justify-center"
          >
            <img
              alt="Alex Morgan - Traveler Profile"
              src={profilePicUrl}
              className="w-8 h-8 rounded-full object-cover shadow-xs"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
