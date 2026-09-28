import React from 'react';

interface BottomNavProps {
  activeTab: 'plan' | 'itinerary' | 'saved' | 'profile';
  setActiveTab: (tab: 'plan' | 'itinerary' | 'saved' | 'profile') => void;
  hasItinerary: boolean;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  hasItinerary,
  savedCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#bfc7d2]/30 shadow-[0_-2px_12px_rgba(2,132,199,0.06)]">
      <div className="flex items-center justify-around h-16 px-2">
        {/* Plan Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('plan')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-colors ${
            activeTab === 'plan' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'plan' ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_awesome
          </span>
          <span className="text-[11px]">Plan</span>
        </button>

        {/* Itinerary Tab */}
        <button
          type="button"
          onClick={() => hasItinerary && setActiveTab('itinerary')}
          disabled={!hasItinerary}
          className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-colors ${
            !hasItinerary
              ? 'text-[#bfc7d2] cursor-not-allowed opacity-50'
              : activeTab === 'itinerary'
              ? 'text-[#006194] font-bold'
              : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'itinerary' ? "'FILL' 1" : "'FILL' 0" }}
          >
            route
          </span>
          <span className="text-[11px]">Itinerary</span>
        </button>

        {/* Saved Trips Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-colors relative ${
            activeTab === 'saved' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'saved' ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark_heart
          </span>
          <span className="text-[11px]">Saved Trips</span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-3.5 w-4 h-4 rounded-full bg-[#006194] text-white text-[10px] flex items-center justify-center font-bold">
              {savedCount}
            </span>
          )}
        </button>

        {/* Profile Tab */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-colors ${
            activeTab === 'profile' ? 'text-[#006194] font-bold' : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
          >
            account_circle
          </span>
          <span className="text-[11px]">Profile</span>
        </button>
      </div>
    </nav>
  );
};
