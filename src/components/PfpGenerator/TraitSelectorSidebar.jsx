import React, { useState } from 'react';
import { 
  Palette, User, Shirt, Smile, Scissors, Glasses, Sliders, Filter, Check
} from 'lucide-react';
import { 
  BACKGROUND_COLORS, BACKGROUND_IMAGES, ALL_BASE_SKINS, OUTFITS, 
  ALL_FACIAL_EXPRESSIONS, ALL_HAIR_STYLES, ACCESSORIES 
} from '../../data/traitsData';

export default function TraitSelectorSidebar({ traits, setTraits }) {
  const [activeCategory, setActiveCategory] = useState('skin');
  const [skinToneFilter, setSkinToneFilter] = useState('all');
  const [hairStyleFilter, setHairStyleFilter] = useState('all');
  const [expressionFilter, setExpressionFilter] = useState('all');

  const categories = [
    { id: 'bg', label: 'Background', icon: Palette, count: '9 Colors + 3 FX' },
    { id: 'skin', label: 'Base Skin', icon: User, count: '16 Variants' },
    { id: 'outfit', label: 'Outfits', icon: Shirt, count: '5 Clothing' },
    { id: 'hair', label: 'Hair & Color', icon: Scissors, count: '25 Combos' },
    { id: 'expression', label: 'Expression & Eyes', icon: Smile, count: '25 Combos' },
    { id: 'accessory', label: 'Accessories', icon: Glasses, count: '7 Items' },
  ];

  // Filtered lists
  const filteredSkins = skinToneFilter === 'all' 
    ? ALL_BASE_SKINS 
    : ALL_BASE_SKINS.filter(s => s.tone === skinToneFilter);

  const filteredHairs = hairStyleFilter === 'all'
    ? ALL_HAIR_STYLES
    : ALL_HAIR_STYLES.filter(h => h.style === hairStyleFilter || h.color === hairStyleFilter);

  const filteredExpressions = expressionFilter === 'all'
    ? ALL_FACIAL_EXPRESSIONS
    : ALL_FACIAL_EXPRESSIONS.filter(e => e.expression === expressionFilter || e.eyeColor === expressionFilter);

  return (
    <div className="w-full bg-zinc-900 border-2 border-zinc-800 flex flex-col h-full shadow-flat-dark">
      
      {/* Category Header Bar */}
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider">Trait Customizer</h2>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1">
          Catalog: 100% Layered PNG Assets
        </span>
      </div>

      {/* Category Tab Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 border-b border-zinc-800 bg-zinc-950">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-2.5 flex flex-col items-center justify-center gap-1 font-mono text-xs border-r border-b border-zinc-800 transition-all ${
                isActive
                  ? 'bg-zinc-900 text-emerald-400 border-b-2 border-b-emerald-400 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
              <span className="truncate max-w-[85px] text-[11px]">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Content Area */}
      <div className="p-4 overflow-y-auto max-h-[620px] flex-1">
        
        {/* 1. BACKGROUND CATEGORY */}
        {activeCategory === 'bg' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 inline-block"></span>
                Solid Color Backgrounds (9 Options)
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {BACKGROUND_COLORS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setTraits((prev) => ({ ...prev, bgColor: bg.value, bgName: bg.name }))}
                    className={`p-2 border font-mono text-xs flex flex-col items-center gap-1.5 transition-all ${
                      traits.bgColor === bg.value
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      className="w-8 h-8 border border-zinc-700 shadow-inner"
                      style={{ backgroundColor: bg.value }}
                    />
                    <span className="text-[10px] text-zinc-300 truncate w-full text-center">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-cyan-400 inline-block"></span>
                Background Image Overlays (3 FX Options)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BACKGROUND_IMAGES.map((img) => {
                  const isSelected = traits.bgImageFile === img.file;
                  return (
                    <button
                      key={img.id}
                      onClick={() => setTraits((prev) => ({ ...prev, bgImageId: img.id, bgImageFile: img.file }))}
                      className={`p-2 border font-mono text-xs flex flex-col items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-2 border-cyan-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00f0ff]'
                          : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                      }`}
                    >
                      <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                        {img.file ? (
                          <img src={img.file} alt={img.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">None</span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-300 font-medium">{img.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. BASE SKIN CATEGORY (All 16 Variations) */}
        {activeCategory === 'skin' && (
          <div className="space-y-4">
            {/* Tone Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap border-b border-zinc-800 pb-3">
              <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Tone Filter:
              </span>
              {['all', 'Pale', 'Tan', 'Warm_Olive', 'Dark_Brown'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSkinToneFilter(tone)}
                  className={`px-2.5 py-1 font-mono text-xs border transition-all ${
                    skinToneFilter === tone
                      ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {tone === 'all' ? 'All (16)' : tone.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Grid of All 16 Base Skins */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredSkins.map((skin) => {
                const isSelected = traits.skinTone === skin.tone && traits.skinTexture === skin.texture;
                return (
                  <button
                    key={skin.id}
                    onClick={() => setTraits((prev) => ({ ...prev, skinTone: skin.tone, skinTexture: skin.texture }))}
                    className={`p-2 border font-mono text-xs flex flex-col items-center gap-2 transition-all relative ${
                      isSelected
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                    )}
                    <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 overflow-hidden">
                      <img src={skin.file} alt={skin.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-zinc-200 text-center font-medium leading-tight">
                      {skin.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. OUTFIT CATEGORY */}
        {activeCategory === 'outfit' && (
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
              Select Cyberpunk / Techwear Outfit (5 Options)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OUTFITS.map((outfit) => {
                const isSelected = traits.outfitFile === outfit.file;
                return (
                  <button
                    key={outfit.id}
                    onClick={() => setTraits((prev) => ({ ...prev, outfitId: outfit.id, outfitFile: outfit.file, outfitName: outfit.name }))}
                    className={`p-3 border font-mono text-xs flex flex-col items-center gap-2 transition-all relative ${
                      isSelected
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                    )}
                    <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 overflow-hidden">
                      <img src={outfit.file} alt={outfit.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-zinc-200 font-bold">{outfit.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. HAIR & COLOR CATEGORY (All 25 Combinations) */}
        {activeCategory === 'hair' && (
          <div className="space-y-4">
            {/* Style & Color Filters */}
            <div className="space-y-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Style Filter:
                </span>
                {['all', 'Spiky_Shonen', 'Cyberpunk_Undercut', 'Flowing_Long', 'Messy_Curtain', 'Bob_Cut'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setHairStyleFilter(st)}
                    className={`px-2 py-0.5 font-mono text-[11px] border transition-all ${
                      hairStyleFilter === st
                        ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'All (25)' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of All 25 Hair Combinations */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {filteredHairs.map((hair) => {
                const isSelected = traits.hairStyle === hair.style && traits.hairColor === hair.color;
                return (
                  <button
                    key={hair.id}
                    onClick={() => setTraits((prev) => ({ ...prev, hairStyle: hair.style, hairColor: hair.color }))}
                    className={`p-2 border font-mono text-xs flex flex-col items-center gap-1.5 transition-all relative ${
                      isSelected
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-[9px]">
                        ✓
                      </span>
                    )}
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                      <img src={hair.file} alt={hair.name} className="w-full h-full object-cover" />
                      <span 
                        className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black shadow"
                        style={{ backgroundColor: hair.colorHex }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-300 text-center leading-tight">
                      {hair.styleName}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono">
                      {hair.colorName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. FACIAL EXPRESSIONS & EYE COLOR CATEGORY (All 25 Combinations) */}
        {activeCategory === 'expression' && (
          <div className="space-y-4">
            {/* Expression Filters */}
            <div className="space-y-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Expression Filter:
                </span>
                {['all', 'Stoic_Neutral', 'Confident_Smirk', 'Bored_Lazy', 'Aggressive_Ready', 'Hype_Excited'].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setExpressionFilter(ex)}
                    className={`px-2 py-0.5 font-mono text-[11px] border transition-all ${
                      expressionFilter === ex
                        ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {ex === 'all' ? 'All (25)' : ex.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of All 25 Expression & Eye Combinations */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {filteredExpressions.map((expr) => {
                const isSelected = traits.expression === expr.expression && traits.eyeColor === expr.eyeColor;
                return (
                  <button
                    key={expr.id}
                    onClick={() => setTraits((prev) => ({ ...prev, expression: expr.expression, eyeColor: expr.eyeColor }))}
                    className={`p-2 border font-mono text-xs flex flex-col items-center gap-1.5 transition-all relative ${
                      isSelected
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-[9px]">
                        ✓
                      </span>
                    )}
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                      <img src={expr.file} alt={expr.name} className="w-full h-full object-cover" />
                      <span 
                        className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black shadow"
                        style={{ backgroundColor: expr.colorHex }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-300 text-center leading-tight">
                      {expr.expressionName}
                    </span>
                    <span className="text-[9px] text-cyan-400 font-mono">
                      {expr.eyeColorName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. ACCESSORY CATEGORY */}
        {activeCategory === 'accessory' && (
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
              Select Cyberpunk Accessories / Gear (7 Items + None)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ACCESSORIES.map((acc) => {
                const isSelected = traits.accessoryFile === acc.file;
                return (
                  <button
                    key={acc.id}
                    onClick={() => setTraits((prev) => ({ ...prev, accessoryId: acc.id, accessoryFile: acc.file, accessoryName: acc.name }))}
                    className={`p-2 border font-mono text-xs flex flex-col items-center gap-2 transition-all relative ${
                      isSelected
                        ? 'border-2 border-emerald-400 bg-zinc-850 shadow-[2px_2px_0px_0px_#00ff66]'
                        : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 text-black rounded-full flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                    )}
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                      {acc.file ? (
                        <img src={acc.file} alt={acc.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-mono">None</span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-200 text-center">{acc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
