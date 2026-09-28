import React from 'react';
import { Layers, Image as ImageIcon, Zap, Sparkles, Code2, ShieldAlert } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalCombinations = '450,000+' }) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-800 shadow-flat-dark px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-mono font-bold text-xl shadow-[2px_2px_0px_0px_#00ff66]">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono font-black text-lg sm:text-xl tracking-tight text-white uppercase">
                CHAIN<span className="text-emerald-400">CRAFTER</span>
              </h1>
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                v1.0 WEB3
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Anime PFP Generator & Punk Pixelator
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-zinc-900 p-1 border border-zinc-800 rounded-none">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
              activeTab === 'generator'
                ? 'bg-emerald-500 text-black border border-emerald-400 shadow-[2px_2px_0px_0px_#000]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            PFP Generator Studio
          </button>

          <button
            onClick={() => setActiveTab('pixelator')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
              activeTab === 'pixelator'
                ? 'bg-cyan-400 text-black border border-cyan-300 shadow-[2px_2px_0px_0px_#000]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Punk-Ify Pixelator
          </button>
        </div>

        {/* Stats / Info Pill */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-zinc-400">Combos:</span>
            <span className="text-emerald-400 font-bold">{totalCombinations}</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-400">Res:</span>
            <span className="text-white font-bold">1000x1000 HQ</span>
          </div>
        </div>

      </div>
    </header>
  );
}
