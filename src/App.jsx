import React, { useState } from 'react';
import Header from './components/Header';
import PfpCanvasPreview from './components/PfpGenerator/PfpCanvasPreview';
import TraitSelectorSidebar from './components/PfpGenerator/TraitSelectorSidebar';
import PixelatorStudio from './components/Pixelator/PixelatorStudio';
import { 
  BACKGROUND_COLORS, BACKGROUND_IMAGES, SKIN_TONES, SKIN_TEXTURES, OUTFITS, 
  EXPRESSION_TYPES, EYE_COLORS, HAIR_STYLES, HAIR_COLORS, ACCESSORIES 
} from './data/traitsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [isRendering, setIsRendering] = useState(false);

  // Core NFT Traits State
  const [traits, setTraits] = useState({
    bgColor: '#09090b',
    bgName: 'Obsidian Zinc',
    bgImageId: 'none',
    bgImageFile: null,
    skinTone: 'Pale',
    skinTexture: 'Cyborg_Metallic_Lines',
    outfitId: 'Cyberpunk_Hoodie',
    outfitFile: '/assets/OUTFITS_CLOTHING/Cyberpunk_Hoodie.png',
    outfitName: 'Cyberpunk Hoodie',
    hairStyle: 'Spiky_Shonen',
    hairColor: 'Electric_Blue',
    expression: 'Confident_Smirk',
    eyeColor: 'Eyes_Heterochromia_Cyan_Pink',
    accessoryId: 'Cyber_Visor',
    accessoryFile: '/assets/ACCESSORIES/Cyber_Visor.png',
    accessoryName: 'Cyber Visor',
  });

  // Roll a random combination across all categories
  const handleRandomize = () => {
    const randomBgColor = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)];
    const randomBgImg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
    
    const randomTone = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
    const randomTexture = SKIN_TEXTURES[Math.floor(Math.random() * SKIN_TEXTURES.length)];
    
    const randomOutfit = OUTFITS[Math.floor(Math.random() * OUTFITS.length)];
    
    const randomHairStyle = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
    
    const randomExpr = EXPRESSION_TYPES[Math.floor(Math.random() * EXPRESSION_TYPES.length)];
    const randomEye = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];
    
    // Accessories: 80% chance of an accessory, 20% none
    const randomAcc = Math.random() > 0.2
      ? ACCESSORIES[Math.floor(1 + Math.random() * (ACCESSORIES.length - 1))]
      : ACCESSORIES[0];

    setTraits({
      bgColor: randomBgColor.value,
      bgName: randomBgColor.name,
      bgImageId: randomBgImg.id,
      bgImageFile: randomBgImg.file,
      skinTone: randomTone.id,
      skinTexture: randomTexture.id,
      outfitId: randomOutfit.id,
      outfitFile: randomOutfit.file,
      outfitName: randomOutfit.name,
      hairStyle: randomHairStyle.id,
      hairColor: randomHairColor.id,
      expression: randomExpr.id,
      eyeColor: randomEye.id,
      accessoryId: randomAcc.id,
      accessoryFile: randomAcc.file,
      accessoryName: randomAcc.name,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Top Web3 Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Area */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Live Canvas Preview & Actions */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <PfpCanvasPreview
                traits={traits}
                onRandomize={handleRandomize}
                isRendering={isRendering}
                setIsRendering={setIsRendering}
              />
            </div>

            {/* Right Column: Trait Selection Sidebar */}
            <div className="lg:col-span-7 h-full">
              <TraitSelectorSidebar
                traits={traits}
                setTraits={setTraits}
              />
            </div>

          </div>
        )}

        {activeTab === 'pixelator' && (
          <PixelatorStudio />
        )}

      </main>

      {/* Flat Dark Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-4 px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-2">
          <div>
            CHAINCRAFTER PFP ENGINE // 1000x1000 ALIGNED LAYER STACK
          </div>
          <div>
            STRICT FLAT SOLID DESIGN SYSTEM // NO UI GRADIENTS
          </div>
        </div>
      </footer>

    </div>
  );
}
