import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { DEFAULT_BACKEND_URL } from '../services/tripApi';

interface ProfileViewProps {
  backendUrl: string;
  setBackendUrl: (url: string) => void;
  onClearStorage: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  backendUrl,
  setBackendUrl,
  onClearStorage,
}) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [localUrl, setLocalUrl] = useState(backendUrl);

  const testConnection = async () => {
    setTestStatus('testing');
    setStatusMessage('Testing connection to ' + localUrl + '...');
    try {
      const pingUrl = `${localUrl.replace(/\/+$/, '')}/?trip=${encodeURIComponent(
        'Make a 1 day trip in Tokyo'
      )}`;
      const res = await fetch(pingUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        setTestStatus('connected');
        setStatusMessage(`Connected successfully! (HTTP ${res.status})`);
        setBackendUrl(localUrl);
      } else {
        setTestStatus('error');
        setStatusMessage(`Server replied with HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (err: unknown) {
      setTestStatus('error');
      const msg = err instanceof Error ? err.message : String(err);
      setStatusMessage(
        `Unable to connect to ${localUrl}. (${msg}). Ensure your backend is running: e.g. node index.js with cors enabled on port 3002.`
      );
    }
  };

  const handleSaveUrl = () => {
    setBackendUrl(localUrl);
    testConnection();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 pb-24 animate-in fade-in duration-300">
      {/* Traveler Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#bfc7d2]/30 flex items-center gap-4">
        <div className="relative">
          <img
            src={ASSETS.profilePic}
            alt="Alex Morgan"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#eaedff] shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#131b2e]">Alex Morgan</h2>
            <span className="bg-[#86f2e4] text-[#006f66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Explorer
            </span>
          </div>
          <p className="text-xs text-[#3f4850] mt-0.5">akankshakadam2306@gmail.com</p>
          <div className="flex items-center gap-3 pt-2 text-[11px] text-[#006194] font-semibold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">flight_takeoff</span>
              Base: San Francisco (SFO)
            </span>
            <span className="text-[#bfc7d2]">·</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">public</span>
              14 Countries Visited
            </span>
          </div>
        </div>
      </div>

      {/* Backend API Configuration & Integration Card */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#bfc7d2]/30 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">dns</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#131b2e]">Express Backend API Settings</h3>
            <p className="text-xs text-[#3f4850]">Integration endpoint for AI itinerary generation</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#f2f3ff] text-xs text-[#131b2e] space-y-1.5 border border-[#bfc7d2]/20">
          <p className="font-semibold text-[#006194] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">info</span>
            Specification Reference:
          </p>
          <p className="text-[#3f4850] leading-relaxed">
            The app generates a natural-language query from your selections (e.g.{' '}
            <code className="bg-white px-1 rounded text-[#006194]">
              Make a 5 day trip from Pune to Japan
            </code>
            ) and calls your local Express server via{' '}
            <code className="bg-white px-1 rounded font-bold">GET /?trip=...</code>.
          </p>
          <p className="text-[#3f4850] text-[11px]">
            Security Note: No Gemini API key is stored or exposed in the frontend. The key remains
            strictly protected in your backend environment file.
          </p>
        </div>

        {/* Backend URL Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#3f4850]">Express API Base URL:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              placeholder="https://tripmate-ai-travel-planner-frontend.onrender.com/"
              className="flex-1 bg-[#f2f3ff] border border-[#bfc7d2]/30 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#131b2e] focus:outline-none focus:border-[#006194] focus:bg-white"
            />
            <button
              type="button"
              onClick={handleSaveUrl}
              className="px-4 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] active:scale-95 transition-all shadow-xs"
            >
              Save & Test
            </button>
            <button
              type="button"
              onClick={() => {
                setLocalUrl(DEFAULT_BACKEND_URL);
                setBackendUrl(DEFAULT_BACKEND_URL);
              }}
              className="px-3 py-2.5 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#cce5ff]"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Live Status Feedback */}
        {testStatus !== 'idle' && (
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              testStatus === 'testing'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : testStatus === 'connected'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[16px] mt-0.5 ${
                testStatus === 'testing' ? 'animate-spin' : ''
              }`}
            >
              {testStatus === 'testing'
                ? 'sync'
                : testStatus === 'connected'
                ? 'check_circle'
                : 'error'}
            </span>
            <div className="space-y-1">
              <p className="font-semibold">{statusMessage}</p>
              {testStatus === 'error' && (
                <p className="text-[11px] opacity-90">
                  Tip: Ensure your server handles CORS by adding{' '}
                  <code className="bg-white/80 px-1 rounded">const cors = require('cors'); app.use(cors());</code>{' '}
                  in your backend script.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Travel Preferences */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#bfc7d2]/30 space-y-3">
        <h3 className="text-base font-bold text-[#131b2e]">Travel Preferences</h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#f2f3ff] space-y-0.5">
            <span className="text-[10px] text-[#707881] font-bold uppercase">Default Currency</span>
            <p className="font-bold text-[#131b2e]">USD ($) / JPY (¥)</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#f2f3ff] space-y-0.5">
            <span className="text-[10px] text-[#707881] font-bold uppercase">Measurement</span>
            <p className="font-bold text-[#131b2e]">Metric / Minutes Walk</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#f2f3ff] space-y-0.5">
            <span className="text-[10px] text-[#707881] font-bold uppercase">Favorite Styles</span>
            <p className="font-bold text-[#131b2e]">Cultural & Culinary Trails</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#f2f3ff] space-y-0.5">
            <span className="text-[10px] text-[#707881] font-bold uppercase">Pacing Priority</span>
            <p className="font-bold text-[#131b2e]">Beat Rush-Hour Crowds</p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#bfc7d2]/20">
          <button
            type="button"
            onClick={onClearStorage}
            className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            Reset App Cache & Saved Trips
          </button>
        </div>
      </div>
    </div>
  );
};
