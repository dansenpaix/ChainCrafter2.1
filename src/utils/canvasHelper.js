import confetti from 'canvas-confetti';
import { getSkinFilePath, getExpressionFilePath, getHairFilePath } from '../data/traitsData';

// Image loading cache helper
const imageCache = new Map();

export function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => {
      console.warn(`Failed to load asset layer: ${src}`, err);
      resolve(null); // Return null on broken path so canvas rendering doesn't crash
    };
    img.src = src;
  });
}

/**
 * Draws all NFT layers in strict stack order to a 1000x1000 HTML5 Canvas
 */
export async function renderNftCanvas(canvas, traits) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width || 1000;
  const height = canvas.height || 1000;

  // Clear previous drawings
  ctx.clearRect(0, 0, width, height);

  // 1. BACKGROUND (Solid color + image overlay if chosen)
  if (traits.bgColor) {
    ctx.fillStyle = traits.bgColor;
    ctx.fillRect(0, 0, width, height);
  }

  if (traits.bgImageFile) {
    const bgImg = await loadImage(traits.bgImageFile);
    if (bgImg) ctx.drawImage(bgImg, 0, 0, width, height);
  }

  // 2. BASE SKIN
  const skinPath = getSkinFilePath(traits.skinTone, traits.skinTexture);
  const skinImg = await loadImage(skinPath);
  if (skinImg) ctx.drawImage(skinImg, 0, 0, width, height);

  // 3. OUTFIT / CLOTHING
  if (traits.outfitFile) {
    const outfitImg = await loadImage(traits.outfitFile);
    if (outfitImg) ctx.drawImage(outfitImg, 0, 0, width, height);
  }

  // 4. HAIR STYLES & HAIR COLOR
  const hairPath = getHairFilePath(traits.hairStyle, traits.hairColor);
  const hairImg = await loadImage(hairPath);
  if (hairImg) ctx.drawImage(hairImg, 0, 0, width, height);

  // 5. FACIAL EXPRESSIONS & EYE COLOR
  const exprPath = getExpressionFilePath(traits.expression, traits.eyeColor);
  const exprImg = await loadImage(exprPath);
  if (exprImg) ctx.drawImage(exprImg, 0, 0, width, height);

  // 6. ACCESSORIES
  if (traits.accessoryFile) {
    const accImg = await loadImage(traits.accessoryFile);
    if (accImg) ctx.drawImage(accImg, 0, 0, width, height);
  }
}

/**
 * Downloads high-res PNG file from canvas
 */
export function downloadCanvasPng(canvas, filename = 'CyberAnime_PFP.png') {
  if (!canvas) return;
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Trigger celebratory confetti
  confetti({
    particleCount: 75,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#00ff66', '#00f0ff', '#ff007f', '#ffe600']
  });
}

/**
 * Generates OpenSea / ERC-721 Metadata JSON
 */
export function generateMetadataJson(traits, tokenId = Math.floor(1000 + Math.random() * 9000)) {
  return {
    name: `CyberPunk Anime #${tokenId}`,
    description: `A unique, 1000x1000 high-res Web3 Cyberpunk Anime avatar built with ChainCrafter Engine.`,
    image: `ipfs://QmExamplePfpHash/${tokenId}.png`,
    dna: generateDnaHash(traits),
    edition: tokenId,
    date: Date.now(),
    attributes: [
      { trait_type: 'Skin Tone', value: traits.skinTone.replace('_', ' ') },
      { trait_type: 'Skin Texture', value: traits.skinTexture.replace('_', ' ') },
      { trait_type: 'Outfit', value: traits.outfitName },
      { trait_type: 'Hair Style', value: traits.hairStyle.replace('_', ' ') },
      { trait_type: 'Hair Color', value: traits.hairColor.replace('_', ' ') },
      { trait_type: 'Expression', value: traits.expression.replace('_', ' ') },
      { trait_type: 'Eye Color', value: traits.eyeColor.replace('Eyes_', '').replace('_', ' ') },
      { trait_type: 'Accessory', value: traits.accessoryName || 'None' },
      { trait_type: 'Background', value: traits.bgName || 'Solid Color' }
    ],
    compiler: 'ChainCrafter NFT PFP Engine v1.0'
  };
}

function generateDnaHash(traits) {
  const str = JSON.stringify(traits);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return '0x' + Math.abs(hash).toString(16).padStart(16, '0');
}

/**
 * Calculates Rarity Score & Tier
 */
export function calculateRarityScore(traits) {
  let score = 50;

  if (traits.skinTexture === 'Alien_Neon_Glow') score += 25;
  if (traits.skinTexture === 'Reptilian_Scales') score += 20;
  if (traits.skinTexture === 'Cyborg_Metallic_Lines') score += 15;

  if (traits.accessoryId && traits.accessoryId !== 'none') {
    if (traits.accessoryId === 'Neon_Halo') score += 30;
    if (traits.accessoryId === 'Cybernetic_Horns') score += 25;
    if (traits.accessoryId === 'Cyber_Visor') score += 20;
    else score += 10;
  }

  if (traits.eyeColor === 'Eyes_Heterochromia_Cyan_Pink') score += 25;
  if (traits.bgImageId && traits.bgImageId !== 'none') score += 15;

  let tier = 'Common';
  let badgeColor = 'bg-zinc-800 text-zinc-300 border-zinc-700';

  if (score >= 120) {
    tier = 'MYTHIC';
    badgeColor = 'bg-pink-950 text-pink-300 border-pink-500 shadow-flat-neon-pink';
  } else if (score >= 95) {
    tier = 'LEGENDARY';
    badgeColor = 'bg-yellow-950 text-yellow-300 border-yellow-500 shadow-flat-neon-pink';
  } else if (score >= 75) {
    tier = 'EPIC';
    badgeColor = 'bg-purple-950 text-purple-300 border-purple-500';
  } else if (score >= 60) {
    tier = 'RARE';
    badgeColor = 'bg-cyan-950 text-cyan-300 border-cyan-500';
  }

  return { score, tier, badgeColor };
}

/**
 * Pixelation & Palette Transformation Engine for Punk-Ify Studio
 */
export function processPixelation({
  sourceImage,
  canvas,
  blockSize = 16,
  paletteMode = 'original',
  brightness = 0,
  contrast = 0,
  saturation = 0,
  showGrid = false
}) {
  if (!sourceImage || !canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Offscreen canvas for downscaling
  const offscreen = document.createElement('canvas');
  const cols = Math.max(8, Math.floor(width / blockSize));
  const rows = Math.max(8, Math.floor(height / blockSize));
  offscreen.width = cols;
  offscreen.height = rows;

  const offCtx = offscreen.getContext('2d');
  offCtx.imageSmoothingEnabled = true;
  offCtx.drawImage(sourceImage, 0, 0, cols, rows);

  // Get low-res image pixel data
  const imgData = offCtx.getImageData(0, 0, cols, rows);
  const data = imgData.data;

  // Apply filters / palette transform
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Brightness adjustment (-100 to 100)
    r = Math.min(255, Math.max(0, r + brightness));
    g = Math.min(255, Math.max(0, g + brightness));
    b = Math.min(255, Math.max(0, b + brightness));

    // Contrast adjustment (-100 to 100)
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    r = Math.min(255, Math.max(0, factor * (r - 128) + 128));
    g = Math.min(255, Math.max(0, factor * (g - 128) + 128));
    b = Math.min(255, Math.max(0, factor * (b - 128) + 128));

    // Saturation adjustment (-100 to 100)
    const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
    const satMult = 1 + saturation / 100;
    r = Math.min(255, Math.max(0, gray + (r - gray) * satMult));
    g = Math.min(255, Math.max(0, gray + (g - gray) * satMult));
    b = Math.min(255, Math.max(0, gray + (b - gray) * satMult));

    // Apply specific palette transform
    if (paletteMode === 'duotone') {
      // Cyberpunk Cyan / Hot Pink duotone
      const luma = (r + g + b) / 3;
      if (luma < 80) {
        // Dark background -> Deep Pitch
        r = 10; g = 10; b = 20;
      } else if (luma < 170) {
        // Midtone -> Neon Hot Pink (#ff007f)
        r = 255; g = 0; b = 127;
      } else {
        // Highlights -> Electric Cyan (#00f0ff)
        r = 0; g = 240; b = 255;
      }
    } else if (paletteMode === 'cryptopunk') {
      // CryptoPunk 8-bit quantized retro palette
      r = Math.round(r / 32) * 32;
      g = Math.round(g / 32) * 32;
      b = Math.round(b / 32) * 32;
    } else if (paletteMode === 'matrix') {
      // Matrix Green Monochrome
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      r = Math.round(luma * 0.1);
      g = Math.min(255, Math.round(luma * 1.2 + 20));
      b = Math.round(luma * 0.2);
    } else if (paletteMode === 'synthwave') {
      // High contrast Synthwave Gold/Purple/Cyan
      const luma = (r + g + b) / 3;
      if (luma < 60) {
        r = 15; g = 5; b = 30;
      } else if (luma < 130) {
        r = 140; g = 20; b = 200;
      } else if (luma < 200) {
        r = 255; g = 0; b = 100;
      } else {
        r = 255; g = 230; b = 0;
      }
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  offCtx.putImageData(imgData, 0, 0);

  // Upscale back onto main canvas with pixelated crispness
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  ctx.drawImage(offscreen, 0, 0, cols, rows, 0, 0, width, height);

  // Optional pixel grid overlay
  if (showGrid) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const stepX = width / cols;
    const stepY = height / rows;

    for (let x = 0; x <= width; x += stepX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += stepY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
}
