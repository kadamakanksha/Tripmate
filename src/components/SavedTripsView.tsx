import React from 'react';
import { SavedTrip, GeneratedItinerary } from '../types/travel';

interface SavedTripsViewProps {
  savedTrips: SavedTrip[];
  onOpenTrip: (itinerary: GeneratedItinerary) => void;
  onDeleteTrip: (id: string) => void;
  onPlanNew: () => void;
}

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  savedTrips,
  onOpenTrip,
  onDeleteTrip,
  onPlanNew,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-24 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl font-bold text-[#131b2e]">Saved Trips</h2>
          <p className="text-xs text-[#3f4850]">Your bookmarked itineraries & travel dreams</p>
        </div>
        <button
          type="button"
          onClick={onPlanNew}
          className="px-3 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-[#007bb9]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Plan New Trip
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-[#bfc7d2]/30 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#f2f3ff] text-[#006194] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[30px]">bookmark_border</span>
          </div>
          <h3 className="text-base font-bold text-[#131b2e]">No Saved Trips Yet</h3>
          <p className="text-xs text-[#3f4850] max-w-sm mx-auto leading-relaxed">
            Generate your first bespoke itinerary and tap "Save to My Trips" to bookmark it for offline access and planning.
          </p>
          <button
            type="button"
            onClick={onPlanNew}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#006194] text-white text-xs font-bold shadow-md hover:bg-[#007bb9] active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            Create Itinerary
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedTrips.map((item) => {
            const trip = item.itinerary;
            const savedDate = new Date(item.savedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#bfc7d2]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row group"
              >
                <div className="h-36 md:h-auto md:w-48 relative flex-shrink-0 overflow-hidden">
                  <img
                    src={trip.heroImage}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                    {trip.durationLabel}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#006a61]">
                        {trip.route}
                      </span>
                      <span className="text-[10px] text-[#707881]">Saved on {savedDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#131b2e] mt-1">{trip.title}</h3>
                    <p className="text-xs text-[#3f4850] line-clamp-1 mt-0.5">{trip.subtitle}</p>

                    <div className="flex items-center gap-2 pt-2 text-[11px] text-[#3f4850]">
                      <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#006194] font-semibold">
                        {trip.budgetLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#131b2e] font-semibold">
                        {trip.styleLabel}
                      </span>
                      <span className="text-[#006194] font-bold tabular-nums">
                        {trip.stats.costPerPerson}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#bfc7d2]/20">
                    <button
                      type="button"
                      onClick={() => onDeleteTrip(item.id)}
                      className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Remove
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenTrip(trip)}
                      className="px-4 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] active:scale-95 transition-all flex items-center gap-1 shadow-xs"
                    >
                      View Itinerary
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
