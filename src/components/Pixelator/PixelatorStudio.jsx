import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Sliders, Image as ImageIcon, RefreshCw, Grid, Palette, Sparkles, Check, Zap } from 'lucide-react';
import { processPixelation, downloadCanvasPng } from '../../utils/canvasHelper';

export default function PixelatorStudio({ currentNftCanvas }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [blockSize, setBlockSize] = useState(16);
  const [paletteMode, setPaletteMode] = useState('duotone'); // duotone, cryptopunk, original, matrix, synthwave
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const canvasRef = useRef(null);
  const imageObjRef = useRef(null);

  // Sample avatar presets for quick testing
  const sampleAvatars = [
    { name: 'Sample Cyber 1', src: '/assets/BASE_SKIN/Pale__Cyborg_Metallic_Lines.png' },
    { name: 'Sample Cyber 2', src: '/assets/BACKGROUNDS/Abstract_Graffiti_Wall.png' },
    { name: 'Sample Cyber 3', src: '/assets/BACKGROUNDS/Cyberpunk_Grid.png' },
  ];

  // Load image whenever imageSrc changes
  useEffect(() => {
    if (!imageSrc) {
      // Default to sample avatar if none loaded
      loadImageToCanvas('/assets/BASE_SKIN/Pale__Cyborg_Metallic_Lines.png');
      return;
    }
    loadImageToCanvas(imageSrc);
  }, [imageSrc]);

  function loadImageToCanvas(src) {
    setIsLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageObjRef.current = img;
      setIsLoaded(true);
      renderPixelArt();
    };
    img.src = src;
  }

  // Re-render pixelation whenever parameters change
  useEffect(() => {
    if (isLoaded && imageObjRef.current) {
      renderPixelArt();
    }
  }, [blockSize, paletteMode, brightness, contrast, saturation, showGrid, isLoaded]);

  function renderPixelArt() {
    if (!canvasRef.current || !imageObjRef.current) return;
    processPixelation({
      sourceImage: imageObjRef.current,
      canvas: canvasRef.current,
      blockSize,
      paletteMode,
      brightness: Number(brightness),
      contrast: Number(contrast),
      saturation: Number(saturation),
      showGrid
    });
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const useCurrentGeneratedNft = () => {
    if (currentNftCanvas) {
      const dataUrl = currentNftCanvas.toDataURL('image/png');
      setImageSrc(dataUrl);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCanvasPng(canvasRef.current, 'PunkIfy_Pixel_PFP.png');
    }
  };

  const palettes = [
    { id: 'duotone', name: 'Cyber Duotone', desc: 'Neon Cyan & Hot Pink', color: 'border-pink-500 bg-pink-950 text-pink-300' },
    { id: 'cryptopunk', name: 'CryptoPunk 8-Bit', desc: 'Retro Quantized Colors', color: 'border-cyan-500 bg-cyan-950 text-cyan-300' },
    { id: 'original', name: 'Original True Color', desc: 'Pixelated Native', color: 'border-zinc-700 bg-zinc-900 text-zinc-300' },
    { id: 'matrix', name: 'Matrix Green', desc: 'Monochrome Hacker', color: 'border-emerald-500 bg-emerald-950 text-emerald-300' },
    { id: 'synthwave', name: 'Synthwave Arcade', desc: 'Purple, Gold & Magenta', color: 'border-purple-500 bg-purple-950 text-purple-300' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Preview Column */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="w-full bg-zinc-900 p-3 border-2 border-zinc-800 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h2 className="font-mono font-bold text-sm text-white uppercase">Punk-Ify Viewport</h2>
          </div>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1 text-xs font-mono border flex items-center gap-1.5 transition-all ${
              showGrid ? 'bg-cyan-950 border-cyan-500 text-cyan-400 font-bold' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            {showGrid ? 'Grid Lines ON' : 'Grid Lines OFF'}
          </button>
        </div>

        {/* Pixel Canvas Viewport */}
        <div className="relative w-full aspect-square max-w-[500px] bg-zinc-950 border-2 border-zinc-800 shadow-[6px_6px_0px_0px_#18181b] overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="w-full h-full object-contain pixel-canvas block"
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-zinc-950/80 flex items-center justify-center font-mono text-xs text-zinc-400">
              <RefreshCw className="w-5 h-5 animate-spin text-cyan-400 mr-2" /> Processing Pixel Matrix...
            </div>
          )}
        </div>

        {/* Download Action */}
        <div className="w-full max-w-[500px] mt-4 flex gap-3">
          {currentNftCanvas && (
            <button
              onClick={useCurrentGeneratedNft}
              className="btn-flat flex-1 bg-zinc-900 hover:bg-zinc-850 text-white font-mono font-bold text-xs py-3 px-3 border-2 border-zinc-700 flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Import Current PFP
            </button>
          )}

          <button
            onClick={handleDownload}
            className="btn-flat flex-1 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-black text-xs py-3 px-4 border-2 border-cyan-300 flex items-center justify-center gap-2 uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]"
          >
            <Download className="w-4 h-4" />
            Download Pixel PFP
          </button>
        </div>
      </div>

      {/* Right Controls Column */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* File Uploader */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4">
          <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            1. Upload Image / Photo
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <label className="btn-flat flex-1 bg-zinc-950 hover:bg-zinc-850 border-2 border-dashed border-zinc-700 p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1 group">
              <Upload className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              <span className="font-mono text-xs text-zinc-200 font-bold">Choose File</span>
              <span className="font-mono text-[10px] text-zinc-500">PNG, JPG, WEBP</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Quick Sample Presets */}
            <div className="flex-1 bg-zinc-950 p-3 border border-zinc-800 flex flex-col justify-between">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">Or Select Sample:</span>
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {sampleAvatars.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageSrc(sample.src)}
                    className="h-12 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 overflow-hidden"
                  >
                    <img src={sample.src} alt={sample.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pixel Block Size Slider */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              2. Pixel Block Density: <span className="text-cyan-400">{blockSize}px Grid</span>
            </label>
            <span className="font-mono text-xs text-zinc-400">
              {blockSize <= 10 ? 'Ultra Detailed (8-bit)' : blockSize >= 28 ? 'Ultra Blocky (CryptoPunk)' : 'Classic Arcade'}
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="36"
            step="2"
            value={blockSize}
            onChange={(e) => setBlockSize(Number(e.target.value))}
            className="w-full h-2 bg-zinc-950 border border-zinc-700 appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between font-mono text-[10px] text-zinc-500 mt-1">
            <span>6px (Detailed)</span>
            <span>16px (Standard)</span>
            <span>36px (CryptoPunk)</span>
          </div>
        </div>

        {/* Color Palette Selector */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4">
          <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            3. Cyberpunk Color Palette Filter
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {palettes.map((pal) => (
              <button
                key={pal.id}
                onClick={() => setPaletteMode(pal.id)}
                className={`p-3 border font-mono text-left transition-all ${
                  paletteMode === pal.id
                    ? `${pal.color} border-2 shadow-[2px_2px_0px_0px_#000]`
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{pal.name}</span>
                  {paletteMode === pal.id && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">{pal.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fine Tuning Controls (Brightness, Contrast, Saturation) */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-4 space-y-4">
          <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            4. Image Processing Adjustments
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Brightness: {brightness}</span>
                <button onClick={() => setBrightness(0)} className="text-[10px] text-zinc-500 underline">Reset</button>
              </div>
              <input
                type="range"
                min="-80"
                max="80"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-950 border border-zinc-700 appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Contrast: {contrast}</span>
                <button onClick={() => setContrast(0)} className="text-[10px] text-zinc-500 underline">Reset</button>
              </div>
              <input
                type="range"
                min="-80"
                max="80"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-950 border border-zinc-700 appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Saturation: {saturation}</span>
                <button onClick={() => setSaturation(0)} className="text-[10px] text-zinc-500 underline">Reset</button>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-950 border border-zinc-700 appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
