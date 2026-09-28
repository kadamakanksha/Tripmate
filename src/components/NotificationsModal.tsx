import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#bfc7d2]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#006194]">
              notifications
            </span>
            <h3 className="text-base font-bold text-[#131b2e]">Trip Notifications</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-[#eaedff] flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#006194] mt-0.5">
              auto_awesome
            </span>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-[#131b2e]">Autumn in Kyoto Itinerary Ready</p>
              <p className="text-[#3f4850]">
                Curated 5 days with 14 activities and 8 food spots under $1,420 per person.
              </p>
              <span className="text-[10px] text-[#707881]">Just now</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f2f3ff] flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#006a61] mt-0.5">
              savings
            </span>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-[#131b2e]">Smart Saver Alert</p>
              <p className="text-[#3f4850]">
                Shinkansen Hayatoku-21 discounts unlocked for October departures.
              </p>
              <span className="text-[10px] text-[#707881]">1 hour ago</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
