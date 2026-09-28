import React from 'react';

interface BackendErrorBannerProps {
  error: string;
  querySent: string;
  backendUrl: string;
  onRetry: () => void;
  onUseFallback: () => void;
  onDismiss: () => void;
  onOpenSettings: () => void;
}

export const BackendErrorBanner: React.FC<BackendErrorBannerProps> = ({
  error,
  querySent,
  backendUrl,
  onRetry,
  onUseFallback,
  onDismiss,
  onOpenSettings,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-3xl bg-amber-50 border border-amber-200 shadow-md space-y-3 animate-in fade-in duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              Could Not Reach Express Backend ({backendUrl})
            </h3>
            <p className="text-xs text-amber-800 mt-0.5">
              Attempted call: <code className="font-mono text-amber-950 font-bold">GET /?trip=...</code>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-amber-700 hover:text-amber-950"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="bg-white/80 p-3 rounded-2xl text-xs space-y-1.5 border border-amber-200/80">
        <p className="text-slate-700">
          <strong>Trip Query Created:</strong>{' '}
          <span className="italic">"{querySent}"</span>
        </p>
        <p className="text-slate-600">
          <strong>Network Status:</strong> {error}
        </p>
        <div className="pt-1 text-[11px] text-slate-500 space-y-0.5">
          <p>• Make sure your Express server is running on port 3002: <code className="bg-slate-100 px-1 rounded">node server.js</code></p>
          <p>• Make sure CORS is enabled in your backend script: <code className="bg-slate-100 px-1 rounded">app.use(cors())</code></p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onRetry}
          className="px-3.5 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] active:scale-95 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Retry Connection
        </button>

        <button
          type="button"
          onClick={onUseFallback}
          className="px-3.5 py-2 rounded-xl bg-[#006a61] text-white text-xs font-bold hover:bg-teal-700 active:scale-95 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Preview Curated Itinerary
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="px-3 py-2 rounded-xl bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 border border-slate-200"
        >
          Change Backend URL
        </button>
      </div>
    </div>
  );
};
