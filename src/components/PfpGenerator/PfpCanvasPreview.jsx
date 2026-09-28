import React, { useRef, useEffect, useState } from 'react';
import { Download, RefreshCw, Eye, Code, Award, ZoomIn, ZoomOut, Grid, Sparkles, Check, Copy } from 'lucide-react';
import { renderNftCanvas, downloadCanvasPng, generateMetadataJson, calculateRarityScore } from '../../utils/canvasHelper';

export default function PfpCanvasPreview({ traits, onRandomize, isRendering, setIsRendering }) {
  const canvasRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [copiedMetadata, setCopiedMetadata] = useState(false);

  const rarity = calculateRarityScore(traits);
  const metadata = generateMetadataJson(traits);

  // Redraw canvas whenever traits state changes
  useEffect(() => {
    let isMounted = true;
    async function updateCanvas() {
      if (setIsRendering) setIsRendering(true);
      if (canvasRef.current) {
        await renderNftCanvas(canvasRef.current, traits);
      }
      if (isMounted && setIsRendering) setIsRendering(false);
    }
    updateCanvas();
    return () => { isMounted = false; };
  }, [traits]);

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCanvasPng(canvasRef.current, `ChainCrafter_Anime_NFT_${metadata.edition}.png`);
    }
  };

  const copyMetadata = () => {
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    setCopiedMetadata(true);
    setTimeout(() => setCopiedMetadata(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Action Toolbar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-zinc-900 p-2 border border-zinc-800">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border ${rarity.badgeColor} flex items-center gap-1.5`}>
            <Award className="w-3.5 h-3.5" />
            {rarity.tier} ({rarity.score} PTS)
          </span>
          {isRendering && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> Rendering...
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel(zoomLevel === 1 ? 1.4 : 1)}
            title="Toggle Face Zoom"
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-mono text-xs transition-colors"
          >
            {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowGridOverlay(!showGridOverlay)}
            title="Toggle Alignment Rig Grid"
            className={`p-1.5 border font-mono text-xs transition-colors ${
              showGridOverlay ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          {/* JSON Metadata button commented out */}
          {/* <button
            onClick={() => setShowMetadataModal(true)}
            title="View ERC-721 Metadata JSON"
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-mono text-xs flex items-center gap-1 transition-colors"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">JSON</span>
          </button> */}
        </div>
      </div>

      {/* Live Canvas Viewport Box */}
      <div className="relative w-full aspect-square max-w-[500px] bg-zinc-950 border-2 border-zinc-800 shadow-[6px_6px_0px_0px_#18181b] overflow-hidden group">
        
        <div 
          className="w-full h-full transition-transform duration-200 ease-out origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            className="w-full h-full object-contain block"
          />
        </div>

        {/* Alignment Rig Grid Lines Overlay */}
        {showGridOverlay && (
          <div className="absolute inset-0 pointer-events-none border border-emerald-500/30 flex flex-col justify-between p-4">
            <div className="w-full border-b border-dashed border-emerald-400/40 text-[10px] font-mono text-emerald-400/70">y=0</div>
            <div className="w-full border-b border-dashed border-emerald-400/40 text-[10px] font-mono text-emerald-400/70">Head Center (y=500)</div>
            <div className="w-full border-b border-dashed border-emerald-400/40 text-[10px] font-mono text-emerald-400/70">Face Baseline (y=600)</div>
            <div className="w-full border-b border-dashed border-emerald-400/40 text-[10px] font-mono text-emerald-400/70">Shoulders (y=720)</div>
            <div className="absolute inset-y-0 left-1/2 border-r border-dashed border-emerald-400/40 text-[10px] font-mono text-emerald-400/70">x=500</div>
          </div>
        )}

        {/* Floating Canvas Watermark */}
        <div className="absolute bottom-2 right-2 bg-zinc-950/90 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 pointer-events-none">
          1000x1000 PX
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="w-full max-w-[500px] grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={onRandomize}
          className="btn-flat w-full bg-zinc-900 hover:bg-zinc-850 text-white font-mono font-bold text-sm py-3 px-4 border-2 border-zinc-700 flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Randomize Traits
        </button>

        <button
          onClick={handleDownload}
          className="btn-flat w-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-sm py-3 px-4 border-2 border-emerald-400 flex items-center justify-center gap-2 uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]"
        >
          <Download className="w-4 h-4" />
          Download NFT
        </button>
      </div>

      {/* Metadata Modal */}
      {showMetadataModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border-2 border-zinc-700 w-full max-w-xl p-6 shadow-flat-dark relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                <h3 className="font-mono font-bold text-lg text-white">ERC-721 Metadata Standard</h3>
              </div>
              <button
                onClick={() => setShowMetadataModal(false)}
                className="text-zinc-400 hover:text-white font-mono text-sm px-2 py-1 bg-zinc-800 border border-zinc-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-mono text-zinc-400 mb-3">
              OpenSea and Web3 Marketplace compatible JSON metadata payload:
            </p>

            <pre className="bg-zinc-950 p-4 border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72 rounded-none mb-4">
              {JSON.stringify(metadata, null, 2)}
            </pre>

            <div className="flex items-center justify-between">
              <button
                onClick={copyMetadata}
                className="btn-flat bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs py-2 px-4 border border-emerald-400 flex items-center gap-2"
              >
                {copiedMetadata ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedMetadata ? 'Copied to Clipboard!' : 'Copy Metadata JSON'}
              </button>
              <button
                onClick={() => setShowMetadataModal(false)}
                className="font-mono text-xs text-zinc-400 hover:text-white underline"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
