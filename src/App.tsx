/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TravelFormData, GeneratedItinerary, SavedTrip } from './types/travel';
import {
  DEFAULT_FORM_DATA,
  KYOTO_REFERENCE_ITINERARY,
  ASSETS,
} from './data/mockData';
import {
  DEFAULT_BACKEND_URL,
  generateItineraryFromBackend,
  synthesizeFallbackItinerary,
} from './services/tripApi';
import { Header } from './components/Header';
import { TravelForm } from './components/TravelForm';
import { GenerationProgress } from './components/GenerationProgress';
import { ItineraryView } from './components/ItineraryView';
import { SavedTripsView } from './components/SavedTripsView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';
import { BackendErrorBanner } from './components/BackendErrorBanner';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'plan' | 'itinerary' | 'saved' | 'profile'>('plan');
  const [formData, setFormData] = useState<TravelFormData>(DEFAULT_FORM_DATA);
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary>(
    KYOTO_REFERENCE_ITINERARY
  );
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const saved = localStorage.getItem('tripmate_saved_trips');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'initial-kyoto-saved',
        savedAt: Date.now() - 3600000 * 2,
        itinerary: KYOTO_REFERENCE_ITINERARY,
      },
    ];
  });

  const [backendUrl, setBackendUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('tripmate_backend_url') || DEFAULT_BACKEND_URL;
    } catch {
      return DEFAULT_BACKEND_URL;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState<{
    error: string;
    querySent: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync savedTrips to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.warn('Could not save trips to localStorage:', e);
    }
  }, [savedTrips]);

  // Sync backendUrl to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_backend_url', backendUrl);
    } catch {
      // ignore
    }
  }, [backendUrl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setBackendError(null);

   
    //https://tripmate-ai-travel-planner.onrender.com/?trip=<query>
    const result = await generateItineraryFromBackend(formData, backendUrl);

    if (result.success && result.itinerary) {
      setCurrentItinerary(result.itinerary);
      setIsLoading(false);
      setActiveTab('itinerary');
      showToast('Itinerary successfully generated from Express API!');
    } else {
      setIsLoading(false);
      setBackendError({
        error: result.error || 'Connection failed or server timed out',
        querySent: result.querySent,
      });
    }
  };

  const handleUseFallbackAfterError = () => {
    const fallback = synthesizeFallbackItinerary(formData);
    setCurrentItinerary(fallback);
    setBackendError(null);
    setActiveTab('itinerary');
    showToast('Viewing curated AI itinerary for ' + formData.destination);
  };

  const handleSaveTrip = (trip: GeneratedItinerary) => {
    const isAlreadySaved = savedTrips.some((t) => t.itinerary.id === trip.id);
    if (isAlreadySaved) {
      setSavedTrips((prev) => prev.filter((t) => t.itinerary.id !== trip.id));
      showToast('Removed from Saved Trips');
    } else {
      const newEntry: SavedTrip = {
        id: 'saved-' + Date.now(),
        savedAt: Date.now(),
        itinerary: trip,
      };
      setSavedTrips((prev) => [newEntry, ...prev]);
      showToast('Trip saved to My Trips!');
    }
  };

  const handleDeleteTrip = (id: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== id));
    showToast('Trip removed');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Trip link copied to clipboard!');
    } else {
      showToast('Trip shared!');
    }
  };

  const handleSelectTrending = (trendingItinerary: GeneratedItinerary) => {
    setCurrentItinerary(trendingItinerary);
    setFormData(trendingItinerary.formData);
    setActiveTab('itinerary');
    showToast(`Loaded ${trendingItinerary.title}`);
  };

  const handleClearStorage = () => {
    setSavedTrips([]);
    localStorage.removeItem('tripmate_saved_trips');
    showToast('Saved trips reset');
  };

  const isCurrentTripSaved = savedTrips.some((t) => t.itinerary.id === currentItinerary.id);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedTrips.length}
        profilePicUrl={ASSETS.profilePic}
        hasItinerary={Boolean(currentItinerary)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Backend Error Banner */}
          {backendError && (
            <BackendErrorBanner
              error={backendError.error}
              querySent={backendError.querySent}
              backendUrl={backendUrl}
              onRetry={handleGenerate}
              onUseFallback={handleUseFallbackAfterError}
              onDismiss={() => setBackendError(null)}
              onOpenSettings={() => {
                setBackendError(null);
                setActiveTab('profile');
              }}
            />
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <GenerationProgress
              destination={formData.destination}
              days={formData.days}
              backendUrl={backendUrl}
            />
          )}

          {/* Views */}
          {activeTab === 'plan' && (
            <TravelForm
              formData={formData}
              setFormData={setFormData}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onSelectTrending={handleSelectTrending}
              backendUrl={backendUrl}
            />
          )}

          {activeTab === 'itinerary' && currentItinerary && (
            <ItineraryView
              itinerary={currentItinerary}
              onPlanAnother={() => setActiveTab('plan')}
              onSaveTrip={handleSaveTrip}
              isSaved={isCurrentTripSaved}
              onRegenerate={handleGenerate}
              onShare={handleShare}
            />
          )}

          {activeTab === 'saved' && (
            <SavedTripsView
              savedTrips={savedTrips}
              onOpenTrip={(trip) => {
                setCurrentItinerary(trip);
                setActiveTab('itinerary');
              }}
              onDeleteTrip={handleDeleteTrip}
              onPlanNew={() => setActiveTab('plan')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              backendUrl={backendUrl}
              setBackendUrl={setBackendUrl}
              onClearStorage={handleClearStorage}
            />
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasItinerary={Boolean(currentItinerary)}
        savedCount={savedTrips.length}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[18px] text-[#86f2e4]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
