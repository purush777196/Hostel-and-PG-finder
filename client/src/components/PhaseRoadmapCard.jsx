import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { ROADMAP_PHASES } from '../utils/constants';

export const PhaseRoadmapCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900 text-sm mb-4">Implementation Roadmap</h3>
      <div className="space-y-3">
        {ROADMAP_PHASES.map((item) => {
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.phase}
              className={`p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-900">{item.phase}: {item.name}</span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isDone ? 'Active / Complete' : 'Upcoming'}
                </span>
              </div>
              <p className="text-xs text-slate-500 pl-6">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
