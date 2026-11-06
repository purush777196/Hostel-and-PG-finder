import React from 'react';
import { TECH_STACK } from '../utils/constants';
import { Code, Zap, Palette, Globe, Server, Database, GitBranch, Cpu } from 'lucide-react';

const iconMap = {
  Code,
  Zap,
  Palette,
  Network: Globe,
  Cpu,
  Server,
  Database,
  GitBranch,
};

export const TechStackGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {TECH_STACK.map((tech) => {
        const IconComponent = iconMap[tech.icon] || Code;
        return (
          <div
            key={tech.name}
            className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-900">{tech.name}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{tech.role}</div>
          </div>
        );
      })}
    </div>
  );
};

