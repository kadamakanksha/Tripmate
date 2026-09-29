import React, { useState } from 'react';
import { GeneratedItinerary, DayPlan } from '../types/travel';

interface ItineraryViewProps {
  itinerary: GeneratedItinerary;
  onPlanAnother: () => void;
  onSaveTrip: (itinerary: GeneratedItinerary) => void;
  isSaved: boolean;
  onRegenerate: () => void;
  onShare: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  onPlanAnother,
  onSaveTrip,
  isSaved,
  onRegenerate,
  onShare,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [showRawOutput, setShowRawOutput] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const activeDay: DayPlan =
    itinerary.days.find((d) => d.dayNumber === selectedDayNumber) || itinerary.days[0] || {
      dayNumber: 1,
      dayOfWeek: 'Day 1',
      dateLabel: 'Day 1',
      neighborhood: 'Downtown',
      walkType: 'Day Tour',
      themeTitle: 'Day Exploration',
      locationOverview: itinerary.title,
      events: [],
    };

  const toggleExpandDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-28 animate-in fade-in duration-300">
      {/* 1. Trip Overview Hero Card */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-[#bfc7d2]/30 bg-white">
        {/* Hero Scenic Banner */}
        <div
          className="relative w-full h-56 md:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url('${itinerary.heroImage}')` }}
        >
          {/* Ambient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/95 via-[#131b2e]/45 to-transparent" />

          {/* Header Badges & Flight Route */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#006194] text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
              {itinerary.route}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#86f2e4]/90 text-[#006f66] text-xs font-bold backdrop-blur-md shadow-xs">
              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
              {itinerary.matchScore}
            </span>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-4 inset-x-4">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#006194]/85 text-white text-[11px] font-semibold backdrop-blur-sm">
                {itinerary.durationLabel}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#e2e7ff]/90 text-[#131b2e] text-[11px] font-semibold backdrop-blur-sm">
                {itinerary.budgetLabel}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#ffddb8] text-[#2a1700] text-[11px] font-semibold backdrop-blur-sm">
                {itinerary.styleLabel}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl text-white font-extrabold drop-shadow-sm leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-xs md:text-sm text-white/90 flex items-center gap-1.5 mt-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">restaurant</span>
              {itinerary.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-4 divide-x divide-[#bfc7d2]/20 bg-[#f2f3ff] px-2 py-3 text-center border-t border-[#bfc7d2]/20">
          <div className="flex flex-col items-center">
            <span className="text-base md:text-lg text-[#006194] font-extrabold tabular-nums">
              {itinerary.stats.activities}
            </span>
            <span className="text-[11px] text-[#3f4850] font-semibold">Activities</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base md:text-lg text-[#006a61] font-extrabold tabular-nums">
              {itinerary.stats.foodSpots}
            </span>
            <span className="text-[11px] text-[#3f4850] font-semibold">Food Spots</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base md:text-lg text-[#825100] font-extrabold tabular-nums">
              {itinerary.stats.costPerPerson}
            </span>
            <span className="text-[11px] text-[#3f4850] font-semibold">Per Person</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base md:text-lg text-[#006194] font-extrabold">
              {itinerary.stats.departureDate}
            </span>
            <span className="text-[11px] text-[#3f4850] font-semibold">Departure</span>
          </div>
        </div>

        {/* Quick Hero Actions */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#bfc7d2]/20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold hover:bg-[#cce5ff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006194]">ios_share</span>
              Share
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold hover:bg-[#cce5ff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-[#3f4850]">download</span>
              Export PDF
            </button>
          </div>
          <button
            type="button"
            onClick={onPlanAnother}
            className="inline-flex items-center gap-1 text-[#006194] text-xs font-bold hover:underline active:opacity-75"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            Customize
          </button>
        </div>
      </div>

      {/* 2. Day-by-Day Itinerary Tabs Navigation */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-bold text-[#131b2e]">Daily Itinerary</span>
          <span className="text-xs font-semibold text-[#006a61]">
            {itinerary.days.length} Days Curated
          </span>
        </div>

        {/* Horizontal Tab Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar py-1">
          {itinerary.days.map((day) => {
            const isActive = day.dayNumber === selectedDayNumber;
            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDayNumber(day.dayNumber)}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl min-w-[76px] transition-all active:scale-95 border ${
                  isActive
                    ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] border-transparent hover:bg-[#e2e7ff]'
                }`}
              >
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold ${
                    isActive ? 'text-white/90' : 'text-[#707881]'
                  }`}
                >
                  Day {day.dayNumber}
                </span>
                <span
                  className={`text-sm font-extrabold leading-tight ${
                    isActive ? 'text-white' : 'text-[#131b2e]'
                  }`}
                >
                  {day.dateLabel}
                </span>
                <span
                  className={`text-[10px] truncate max-w-[65px] ${
                    isActive ? 'text-white/80' : 'text-[#707881]'
                  }`}
                >
                  {day.neighborhood}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Active Day Card */}
      <div className="relative w-full rounded-3xl bg-white p-5 md:p-6 shadow-sm border border-[#bfc7d2]/30 space-y-5">
        {/* Day Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold">
                Day {activeDay.dayNumber} • {activeDay.dayOfWeek}
              </span>
              <span className="text-xs text-[#006a61] font-semibold">{activeDay.walkType}</span>
            </div>
            <h2 className="text-lg md:text-xl text-[#131b2e] font-extrabold mt-1.5 leading-snug">
              {activeDay.themeTitle}
            </h2>
            <p className="text-xs text-[#3f4850] flex items-center gap-1 mt-1 font-medium">
              <span className="material-symbols-outlined text-[15px] text-[#006194]">
                location_on
              </span>
              {activeDay.locationOverview}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowMapModal(true)}
            aria-label="View on map"
            className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006194] hover:bg-[#cce5ff] transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 space-y-5">
          {/* Vertical Connecting Line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-[#dae2fd]" />

          {activeDay.events.map((evt, idx) => {
            const isMorning = evt.tagType === 'morning' || idx === 0;
            const isAfternoon = evt.tagType === 'cultural' || idx === 1;

            const icon = isMorning
              ? 'wb_twilight'
              : isAfternoon
              ? 'emoji_food_beverage'
              : 'nightlight';

            const pinBg = isMorning
              ? 'bg-[#007bb9] text-white'
              : isAfternoon
              ? 'bg-[#006a61] text-white'
              : 'bg-[#a36700] text-white';

            const tagColor = isMorning
              ? 'bg-[#eaedff] text-[#131b2e]'
              : isAfternoon
              ? 'bg-[#86f2e4] text-[#006f66]'
              : 'bg-[#ffddb8] text-[#653e00]';

            return (
              <div key={idx} className="relative">
                {/* Timeline Pin */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${pinBg}`}
                >
                  <span className="material-symbols-outlined text-[12px]">{icon}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#006194]">{evt.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tagColor}`}>
                      {evt.tag}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-[#131b2e]">{evt.title}</h3>
                  <p className="text-xs text-[#3f4850] leading-relaxed">{evt.description}</p>

                  {(evt.durationWalk || evt.fee) && (
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      {evt.durationWalk && (
                        <span className="inline-flex items-center gap-1 text-[#006a61] font-medium text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">
                            directions_walk
                          </span>
                          {evt.durationWalk}
                        </span>
                      )}
                      {evt.durationWalk && evt.fee && <span className="text-[#bfc7d2]">·</span>}
                      {evt.fee && (
                        <span className="text-[11px] text-[#707881] font-semibold">{evt.fee}</span>
                      )}
                    </div>
                  )}

                  {evt.badgeNote && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#3f4850] text-[11px] font-semibold border border-[#bfc7d2]/30 mt-1">
                      <span className="material-symbols-outlined text-[14px] text-[#825100]">
                        stars
                      </span>
                      {evt.badgeNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Food Spotlight Card for Active Day */}
        {activeDay.foodSpot && (
          <div className="relative rounded-2xl overflow-hidden bg-[#f2f3ff] p-3.5 flex flex-col gap-2.5 border border-[#bfc7d2]/20">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#825100] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">local_dining</span>
                {activeDay.foodSpot.mealType}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d] text-[10px] font-bold">
                Must Eat
              </span>
            </div>

            <div className="flex gap-3 items-center">
              {/* Food Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-xs">
                <img
                  alt={activeDay.foodSpot.title}
                  src={activeDay.foodSpot.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Food Specs */}
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="text-sm font-bold text-[#131b2e] truncate">
                  {activeDay.foodSpot.title}
                </h4>
                <p className="text-xs text-[#3f4850] line-clamp-2 leading-relaxed">
                  {activeDay.foodSpot.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-xs font-bold text-[#131b2e]">
                    {activeDay.foodSpot.cost}
                  </span>
                  <span className="text-[#bfc7d2]">·</span>
                  <span className="text-[11px] text-[#006a61] font-semibold">
                    {activeDay.foodSpot.dietary}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Other Days Previews (Expandable) */}
      <div className="space-y-3">
        {itinerary.days
          .filter((d) => d.dayNumber !== selectedDayNumber)
          .map((day) => {
            const isExpanded = expandedDays.includes(day.dayNumber);
            return (
              <div
                key={day.dayNumber}
                className="w-full rounded-2xl bg-white p-4 shadow-xs border border-[#bfc7d2]/30 space-y-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-[11px] font-bold">
                      Day {day.dayNumber} • Preview
                    </span>
                    <span className="text-xs text-[#006a61] font-semibold">{day.neighborhood}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleExpandDay(day.dayNumber)}
                    className="text-xs text-[#006194] font-bold flex items-center hover:underline cursor-pointer"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                    <span className="material-symbols-outlined text-[16px]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="text-sm md:text-base font-bold text-[#131b2e]">{day.themeTitle}</h3>
                  <p className="text-xs text-[#3f4850] line-clamp-2 mt-0.5 leading-relaxed">
                    {day.events[0]?.description || day.locationOverview}
                  </p>
                </div>

                {/* Activity Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(day.previewActivities || day.events.map((e) => e.title.slice(0, 20))).map(
                    (act, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#eaedff] text-xs text-[#131b2e] font-medium flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px] text-[#006194]">
                          check
                        </span>
                        {act}
                      </span>
                    )
                  )}
                </div>

                {/* Expanded Day Details */}
                {isExpanded && (
                  <div className="pt-3 mt-2 border-t border-[#bfc7d2]/20 space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDayNumber(day.dayNumber)}
                      className="text-xs font-bold text-[#006194] flex items-center gap-1 hover:underline"
                    >
                      <span>Jump to full Day {day.dayNumber} schedule</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 5. AI Smart Budget Saver Card */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#cce5ff] to-[#eaedff] p-5 shadow-xs border border-[#006194]/20 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[18px]">savings</span>
          </div>
          <h3 className="text-sm md:text-base text-[#001d31] font-bold">
            AI Smart Saver Tips for {itinerary.styleLabel}
          </h3>
        </div>

        <p className="text-xs text-[#3f4850] leading-relaxed">
          Our travel engine spotted opportunities to optimize your group budget under{' '}
          <strong className="text-[#006194]">{itinerary.stats.costPerPerson}</strong> each:
        </p>

        <ul className="space-y-2">
          {itinerary.smartSaverTips.map((tip, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 bg-white/85 backdrop-blur-sm p-3 rounded-2xl border border-white/60 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006194] flex-shrink-0 mt-0.5">
                {tip.icon}
              </span>
              <p className="text-xs text-[#131b2e] leading-relaxed">
                <strong className="font-bold">{tip.title}:</strong> {tip.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Local Food & Must-Eat Guide (Foodie Checklist) */}
      <div className="w-full rounded-3xl bg-white p-5 shadow-sm border border-[#bfc7d2]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#825100]" />
            <h3 className="text-base font-bold text-[#131b2e]">Foodie Checklist</h3>
          </div>
          <span className="text-xs text-[#3f4850] font-semibold">
            {itinerary.foodieChecklist.length} Top Picks
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {itinerary.foodieChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-[#f2f3ff] flex flex-col justify-between border border-[#bfc7d2]/20 hover:bg-[#eaedff] transition-colors"
            >
              <div>
                <span className="text-[10px] text-[#825100] font-extrabold uppercase tracking-wide">
                  {item.category}
                </span>
                <h4 className="text-xs md:text-sm font-bold text-[#131b2e] mt-0.5 leading-snug">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#3f4850] truncate mt-0.5">{item.venue}</p>
              </div>
              <span className="text-xs text-[#006194] font-bold mt-2.5 tabular-nums">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Interactive Feedback & Generation Details */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#eaedff] text-[#3f4850] text-xs border border-[#bfc7d2]/20">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#006a61]">verified</span>
          <span>
            Generated in {itinerary.generationTime} with {itinerary.modelName || 'TripMate AI'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {itinerary.rawText && (
            <button
              type="button"
              onClick={() => setShowRawOutput(!showRawOutput)}
              className="text-[#006194] font-bold hover:underline"
            >
              {showRawOutput ? 'Hide Text' : 'View Text'}
            </button>
          )}
          <button
            type="button"
            onClick={onRegenerate}
            className="text-[#006194] font-bold hover:underline cursor-pointer"
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* Raw Backend Response Drawer */}
      {showRawOutput && itinerary.rawText && (
        <div className="bg-[#131b2e] text-[#f2f3ff] p-4 rounded-2xl font-mono text-xs overflow-x-auto space-y-2 border border-slate-700">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <span className="font-sans font-bold text-slate-300">
              Raw Output from Express API (https://tripmate-ai-travel-planner.onrender.com)
            </span>
            <button
              type="button"
              onClick={() => setShowRawOutput(false)}
              className="text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
            {itinerary.rawText}
          </pre>
        </div>
      )}

      {/* 8. Sticky Action Toolbar */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-gradient-to-t from-[#faf8ff] via-[#faf8ff]/95 to-transparent pt-3 pb-3 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={onPlanAnother}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-2xl bg-[#e2e7ff] text-[#006194] font-bold text-xs md:text-sm active:scale-[0.98] transition-all hover:bg-[#cce5ff] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">autorenew</span>
            Plan Another
          </button>

          <button
            type="button"
            onClick={() => onSaveTrip(itinerary)}
            className={`flex-[1.5] inline-flex items-center justify-center gap-1.5 h-12 rounded-2xl font-bold text-xs md:text-sm active:scale-[0.98] transition-all shadow-md cursor-pointer ${
              isSaved
                ? 'bg-[#006a61] text-white shadow-[#006a61]/25'
                : 'bg-[#006194] text-white shadow-[#006194]/25 hover:brightness-105'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSaved ? 'bookmark_added' : 'bookmark_add'}
            </span>
            {isSaved ? 'Saved to My Trips' : 'Save to My Trips'}
          </button>
        </div>
      </div>

      {/* Interactive Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#006194]">
                  map
                </span>
                <h3 className="text-base font-bold text-[#131b2e]">
                  {activeDay.neighborhood} Route Map
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Stylized Visual Map Canvas */}
            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-[#cce5ff] to-[#86f2e4]/30 relative overflow-hidden flex flex-col items-center justify-center border border-[#bfc7d2]/40">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#006194_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#006194] text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                  {activeDay.locationOverview}
                </div>
                <p className="text-xs text-[#3f4850] max-w-xs">
                  {activeDay.walkType} covering {activeDay.events.length} scenic waypoints
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#3f4850]">Scheduled Stops:</h4>
              <ul className="text-xs space-y-1">
                {activeDay.events.map((e, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#131b2e]">
                    <span className="w-4 h-4 rounded-full bg-[#006194] text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{e.title}</span>
                    <span className="text-[#707881] text-[11px]">({e.time.split('–')[0].trim()})</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setShowMapModal(false)}
              className="w-full py-3 rounded-xl bg-[#006194] text-white text-xs font-bold"
            >
              Back to Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
