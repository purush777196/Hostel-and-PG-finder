import React from 'react';
import { Activity, CheckCircle2, XCircle, Loader2, RefreshCw, Server } from 'lucide-react';
import { useHealthCheck } from '../hooks/useHealthCheck';

export const HealthStatusCard = () => {
  const { status, data, error, lastChecked, recheck } = useHealthCheck();

  const isHealthy = status === 'healthy';
  const isChecking = status === 'checking';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${
            isChecking ? 'bg-amber-50 text-amber-600' :
            isHealthy ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Backend API Health Status</h3>
            <p className="text-xs text-slate-500">Endpoint: <code className="font-mono text-indigo-600">GET /api/health</code></p>
          </div>
        </div>

        <button
          onClick={recheck}
          disabled={isChecking}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors"
          title="Re-check health endpoint"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin text-indigo-600' : ''}`} />
          <span>{isChecking ? 'Checking...' : 'Check Status'}</span>
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {/* Status indicator row */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs font-medium text-slate-600">Connection State:</span>
          <div className="flex items-center space-x-2">
            {isChecking && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span className="text-xs font-semibold text-amber-600">Connecting to server...</span>
              </>
            )}
            {isHealthy && (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">Online &amp; Healthy (200 OK)</span>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-semibold text-rose-600">Disconnected</span>
              </>
            )}
          </div>
        </div>

        {/* Payload output */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-slate-600">API Response Payload:</span>
            {lastChecked && (
              <span className="text-[11px] text-slate-400">Checked at {lastChecked}</span>
            )}
          </div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
            {isChecking && (
              <span className="text-slate-400">Waiting for backend response...</span>
            )}
            {isHealthy && (
              <pre className="text-emerald-400">{JSON.stringify(data, null, 2)}</pre>
            )}
            {status === 'error' && (
              <div className="text-rose-400">
                <p>Error: {error}</p>
                <p className="text-[11px] text-slate-400 mt-1">Make sure the backend is running (`npm run server` or `npm run dev`).</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
