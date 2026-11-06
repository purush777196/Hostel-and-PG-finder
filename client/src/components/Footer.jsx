import React from 'react';
import { APP_CONFIG } from '../utils/constants';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:items-center">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {APP_CONFIG.name}. Built with MERN Stack.
        </p>
        <p className="text-xs text-slate-400 mt-2 sm:mt-0 font-mono">
          Phase 0 – Architecture &amp; Repository Setup
        </p>
      </div>
    </footer>
  );
};
