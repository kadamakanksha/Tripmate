import React, { useState } from 'react';
import { TravelFormData, BudgetTier, TravelStyle, GeneratedItinerary } from '../types/travel';
import { ASSETS, KYOTO_REFERENCE_ITINERARY, BALI_REFERENCE_ITINERARY } from '../data/mockData';
import { buildTripQuery } from '../services/tripApi';

interface TravelFormProps {
  formData: TravelFormData;
  setFormData: React.Dispatch<React.SetStateAction<TravelFormData>>;
  onGenerate: () => void;
  isLoading: boolean;
  onSelectTrending: (itinerary: GeneratedItinerary) => void;
  backendUrl: string;
}

const POPULAR_DESTINATIONS = [
  'Tokyo, Japan',
  'Kyoto, Japan',
  'Paris, France',
  'Bali, Indonesia',
  'Reykjavik, Iceland',
  'Rome, Italy',
];

const FOOD_OPTIONS = [
  { name: 'Local Street Food', icon: 'ramen_dining' },
  { name: 'Authentic Cuisine', icon: 'soup_kitchen' },
  { name: 'Vegan / Veg', icon: 'eco' },
  { name: 'Fine Dining', icon: 'wine_bar' },
  { name: 'Halal', icon: 'dinner_dining' },
  { name: 'Seafood Lover', icon: 'set_meal' },
];

export const TravelForm: React.FC<TravelFormProps> = ({
  formData,
  setFormData,
  onGenerate,
  isLoading,
  onSelectTrending,
  backendUrl,
}) => {
  const [showQueryPreview, setShowQueryPreview] = useState(false);

  const setDest = (city: string) => {
    setFormData((prev) => ({ ...prev, destination: city }));
  };

  const selectDuration = (days: number) => {
    setFormData((prev) => ({ ...prev, days }));
  };

  const selectBudget = (budget: BudgetTier) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const toggleStyle = (style: TravelStyle) => {
    setFormData((prev) => ({ ...prev, style }));
  };

  const toggleFood = (food: string) => {
    setFormData((prev) => {
      const exists = prev.foodPreferences.includes(food);
      const updated = exists
        ? prev.foodPreferences.filter((f) => f !== food)
        : [...prev.foodPreferences, food];
      return { ...prev, foodPreferences: updated };
    });
  };

  const currentQuery = buildTripQuery(formData);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 pb-8">
      {/* 1. Hero Scenic Banner Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg shadow-[#006194]/10">
        <div
          className="w-full h-64 md:h-72 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${ASSETS.heroPlanBanner}')` }}
        >
          {/* Ambient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/55 to-transparent" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-[#006194]">
              auto_awesome
            </span>
            <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wider">
              AI-Powered Travel
            </span>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-4 inset-x-4 text-white">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm mb-1">
              Plan your perfect trip with AI
            </h1>
            <p className="text-xs md:text-sm text-[#eef0ff]/95 drop-shadow-xs max-w-lg leading-relaxed">
              Create personalized, optimized itineraries in seconds with computational precision.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Planning Form Card */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#bfc7d2]/30 space-y-5">
        {/* Departing From */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006194]">
              flight_takeoff
            </span>
            Departing From
          </label>
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-3 rounded-2xl border border-transparent focus-within:border-[#006194] focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[#707881] text-[20px]">near_me</span>
            <input
              type="text"
              value={formData.fromCity}
              onChange={(e) => setFormData({ ...formData, fromCity: e.target.value })}
              placeholder="City or Airport code (e.g. San Francisco, USA or Pune)"
              className="bg-transparent text-sm text-[#131b2e] w-full focus:outline-none placeholder:text-[#707881] font-medium"
            />
          </div>
        </div>

        {/* Where to? (Destination) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006a61]">explore</span>
            Where to?
          </label>
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-4 py-3 rounded-2xl border border-transparent focus-within:border-[#006194] focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[#006a61] text-[20px]">
              location_on
            </span>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Destination country, island or city"
              className="bg-transparent text-sm text-[#131b2e] w-full focus:outline-none placeholder:text-[#707881] font-semibold"
            />
          </div>

          {/* Popular destination quick chips */}
          <div className="pt-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-semibold text-[#707881] flex-shrink-0">Popular:</span>
            {POPULAR_DESTINATIONS.map((city) => {
              const short = city.split(',')[0];
              const isSelected = formData.destination.toLowerCase().includes(short.toLowerCase());
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDest(city)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#cce5ff]'
                  }`}
                >
                  {short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration of Stay */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#825100]">
                calendar_month
              </span>
              Duration of Stay
            </label>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] font-bold">
              {formData.days} {formData.days === 1 ? 'Day' : formData.days >= 10 ? 'Days (10+)' : 'Days'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 3, 5, 7, 10].map((d) => {
              const isSelected = formData.days === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => selectDuration(d)}
                  className={`py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#006194] text-white font-bold shadow-xs'
                      : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                  }`}
                >
                  {d === 10 ? '10+ Days' : d === 1 ? '1 Day' : `${d} Days`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Tier */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#825100]">payments</span>
            Budget Tier
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Budget */}
            <div
              onClick={() => selectBudget('budget')}
              className={`cursor-pointer p-3 rounded-2xl flex items-center justify-between transition-all border ${
                formData.budget === 'budget'
                  ? 'bg-[#cce5ff]/40 border-[#006194] shadow-xs'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    formData.budget === 'budget'
                      ? 'bg-[#006194] text-white'
                      : 'bg-white text-[#131b2e]'
                  }`}
                >
                  $
                </div>
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">Budget</p>
                  <p className="text-xs text-[#3f4850]">Backpacker friendly & smart hostels</p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                  formData.budget === 'budget'
                    ? 'bg-[#006194] text-white'
                    : 'bg-[#eaedff] border border-[#bfc7d2]'
                }`}
              >
                {formData.budget === 'budget' && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </div>
            </div>

            {/* Moderate */}
            <div
              onClick={() => selectBudget('moderate')}
              className={`cursor-pointer p-3 rounded-2xl flex items-center justify-between transition-all border ${
                formData.budget === 'moderate'
                  ? 'bg-[#cce5ff]/40 border-[#006194] shadow-xs'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    formData.budget === 'moderate'
                      ? 'bg-[#006194] text-white'
                      : 'bg-white text-[#131b2e]'
                  }`}
                >
                  $$
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-[#006194]">Moderate</p>
                    <span className="bg-[#86f2e4] text-[#006f66] text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850]">
                    Comfortable 3–4★ boutique stays & local cafes
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                  formData.budget === 'moderate'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#eaedff] border border-[#bfc7d2]'
                }`}
              >
                {formData.budget === 'moderate' && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </div>
            </div>

            {/* Luxury */}
            <div
              onClick={() => selectBudget('luxury')}
              className={`cursor-pointer p-3 rounded-2xl flex items-center justify-between transition-all border ${
                formData.budget === 'luxury'
                  ? 'bg-[#cce5ff]/40 border-[#006194] shadow-xs'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    formData.budget === 'luxury'
                      ? 'bg-[#006194] text-white'
                      : 'bg-white text-[#131b2e]'
                  }`}
                >
                  $$$
                </div>
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">Luxury</p>
                  <p className="text-xs text-[#3f4850]">
                    5★ resorts, private transfers & fine dining
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                  formData.budget === 'luxury'
                    ? 'bg-[#006194] text-white'
                    : 'bg-[#eaedff] border border-[#bfc7d2]'
                }`}
              >
                {formData.budget === 'luxury' && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Travel Style */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006a61]">group</span>
            Travel Style
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'solo', label: 'Solo', icon: 'backpack' },
              { id: 'family', label: 'Family', icon: 'family_restroom' },
              { id: 'friends', label: 'Friends', icon: 'celebration' },
              { id: 'student', label: 'Student', icon: 'school' },
            ].map((st) => {
              const isSelected = formData.style === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => toggleStyle(st.id as TravelStyle)}
                  className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#006a61] text-white font-bold shadow-xs'
                      : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isSelected ? 'text-white' : 'text-[#3f4850]'
                    }`}
                  >
                    {st.icon}
                  </span>
                  <span className="text-xs font-semibold">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Food & Dining Preferences */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-[#3f4850] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#825100]">restaurant</span>
            Food & Dining Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {FOOD_OPTIONS.map((opt) => {
              const isSelected = formData.foodPreferences.includes(opt.name);
              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => toggleFood(opt.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#86f2e4] text-[#006f66] shadow-xs ring-1 ring-[#006f66]/20'
                      : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{opt.icon}</span>
                  {opt.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Natural Language Prompt Preview Accordion */}
        <div className="pt-1 border-t border-[#bfc7d2]/20">
          <button
            type="button"
            onClick={() => setShowQueryPreview(!showQueryPreview)}
            className="w-full flex items-center justify-between text-xs text-[#006194] font-semibold py-1 hover:underline"
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">code</span>
              Backend Query Payload Preview ({backendUrl})
            </span>
            <span className="material-symbols-outlined text-[16px]">
              {showQueryPreview ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {showQueryPreview && (
            <div className="mt-2 p-3 rounded-xl bg-[#f2f3ff] text-xs font-mono text-[#131b2e] border border-[#bfc7d2]/30 space-y-1">
              <p className="text-[#3f4850] text-[11px] font-sans">
                Endpoint:{' '}
                <span className="font-mono text-[#006194]">
                  {backendUrl}/?trip=&#123;encoded_query&#125;
                </span>
              </p>
              <p className="text-slate-800 break-words">
                <strong>Natural Language Query:</strong> "{currentQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Prominent Generate Itinerary Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isLoading || !formData.destination.trim()}
            onClick={onGenerate}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#006194] to-[#007bb9] text-white font-bold text-base md:text-lg shadow-lg shadow-[#006194]/25 active:scale-[0.98] transition-all hover:brightness-105 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[22px] animate-spin">refresh</span>
                <span>Generating with AI...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                <span>Generate Itinerary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Trending AI Itineraries Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-[#131b2e]">Trending AI Itineraries</h2>
            <p className="text-xs text-[#3f4850]">Curated and loved by the travel community</p>
          </div>
          <span className="text-xs text-[#006194] font-semibold">2 Featured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kyoto Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#bfc7d2]/30 flex flex-col group">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={ASSETS.kyotoTrendingCard}
                alt="Kyoto Temples and Gardens"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#131b2e]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-xs">
                <span
                  className="material-symbols-outlined text-[14px] text-[#ffb95f]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.92 (312)
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#006194] text-xs font-bold shadow-xs">
                5 Days • Moderate Budget
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">
                  Kyoto Temples & Culinary Trails
                </h3>
                <p className="text-xs text-[#3f4850] line-clamp-2 mt-1 leading-relaxed">
                  From dawn at Fushimi Inari and Arashiyama groves to evening Michelin ramen in
                  Gion's lantern-lit stone alleys.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#bfc7d2]/20">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006a61] text-[18px]">
                    verified
                  </span>
                  <span className="text-xs text-[#006a61] font-semibold">98% Match</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectTrending(KYOTO_REFERENCE_ITINERARY)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-bold hover:bg-[#cce5ff] transition-colors"
                >
                  View Plan
                </button>
              </div>
            </div>
          </div>

          {/* Bali Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#bfc7d2]/30 flex flex-col group">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={ASSETS.baliTrendingCard}
                alt="Bali Coastline & Sanctuary"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#131b2e]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-xs">
                <span
                  className="material-symbols-outlined text-[14px] text-[#ffb95f]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                4.88 (480)
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#006a61] text-xs font-bold shadow-xs">
                7 Days • Luxury
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">
                  Bali Coastline & Island Sanctuary
                </h3>
                <p className="text-xs text-[#3f4850] line-clamp-2 mt-1 leading-relaxed">
                  Surf sessions at Canggu, private waterfall treks in Munduk, and sunset seafood
                  dinners perched over Uluwatu cliffs.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#bfc7d2]/20">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#006a61] text-[18px]">eco</span>
                  <span className="text-xs text-[#006a61] font-semibold">Zero-Waste Certified</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectTrending(BALI_REFERENCE_ITINERARY)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-bold hover:bg-[#cce5ff] transition-colors"
                >
                  View Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Travel Intelligence Tip Card */}
      <div className="p-4 rounded-2xl bg-[#eaedff] flex items-center gap-3 border border-[#bfc7d2]/20">
        <div className="w-10 h-10 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center flex-shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#131b2e]">Did you know?</p>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            TripMate AI recalculates transit times in real time to avoid rush-hour crowds at major
            cultural monuments.
          </p>
        </div>
      </div>
    </div>
  );
};
