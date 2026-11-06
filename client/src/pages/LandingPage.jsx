import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Layers, Server } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';
import { HealthStatusCard } from '../components/HealthStatusCard';
import { TechStackGrid } from '../components/TechStackGrid';
import { PhaseRoadmapCard } from '../components/PhaseRoadmapCard';

export const LandingPage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Project Initialization Status: Ready (Phase 0)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Hostel and PG Finder
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-medium text-indigo-600">
          Find your perfect accommodation
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Welcome to the Hostel and PG Finder platform. The foundational MERN architecture,
          Vite frontend, Express REST API, MongoDB connection module, and environment security
          have been successfully initialized.
        </p>
      </section>

      {/* Grid: Live API Health & Phase 0 Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Real-time Health Monitor */}
        <div>
          <HealthStatusCard />
        </div>

        {/* Phase 0 Checklist & Architecture Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Phase 0 Initialization Status</h3>
              <p className="text-xs text-slate-500">Core architecture verification</p>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {[
              { label: 'Repository Monorepo Structure', desc: 'Independent client/ and server/ setup' },
              { label: 'React + Vite Frontend', desc: 'Modern SPA bundler with hot module replacement' },
              { label: 'Tailwind CSS Integration', desc: 'Responsive typography and design token configuration' },
              { label: 'Express.js Backend API', desc: 'Configured with CORS, Helmet, and Morgan' },
              { label: 'Health Endpoint (/api/health)', desc: 'Standardized JSON status code and message' },
              { label: 'MongoDB Connection Module', desc: 'Resilient connection handling with Mongoose' },
              { label: 'Environment Security', desc: 'Dotenv configuration with .env.example templates' },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <span className="text-slate-500 block text-[11px]">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Configured Technology Stack</h2>
          <p className="text-xs text-slate-500">Industry-standard tools and libraries initialized in this phase</p>
        </div>
        <TechStackGrid />
      </section>

      {/* Roadmap Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Project Roadmap</h2>
          <p className="text-xs text-slate-500">Scheduled progression across development phases</p>
        </div>
        <PhaseRoadmapCard />
      </section>
    </div>
  );
};

