// Catalog of all NFT layered assets and trait configurations

export const BACKGROUND_COLORS = [
  { id: 'zinc-950', name: 'Obsidian Zinc', value: '#09090b' },
  { id: 'neon-green', name: 'Matrix Neon', value: '#00ff66' },
  { id: 'cyber-cyan', name: 'Cyber Cyan', value: '#00f0ff' },
  { id: 'hot-pink', name: 'Synth Pink', value: '#ff007f' },
  { id: 'electric-purple', name: 'Void Purple', value: '#7e22ce' },
  { id: 'solar-yellow', name: 'Solar Flare', value: '#eab308' },
  { id: 'crimson-red', name: 'Blood Crimson', value: '#991b1b' },
  { id: 'cobalt-blue', name: 'Deep Cobalt', value: '#0369a1' },
  { id: 'pure-black', name: 'Midnight Pitch', value: '#000000' },
];

export const BACKGROUND_IMAGES = [
  { id: 'none', name: 'Solid Color Only', file: null },
  { id: 'Abstract_Graffiti_Wall', name: 'Cyber Graffiti', file: '/assets/BACKGROUNDS/Abstract_Graffiti_Wall.png' },
  { id: 'Cyberpunk_Grid', name: 'Cyberpunk Grid', file: '/assets/BACKGROUNDS/Cyberpunk_Grid.png' },
  { id: 'Flat_Neon_Gradient_Solid', name: 'Neon Solid Aura', file: '/assets/BACKGROUNDS/Flat_Neon_Gradient_Solid.png' },
];

// 16 Full Base Skins
export const ALL_BASE_SKINS = [
  // Pale
  { id: 'Pale__Smooth_Standard', tone: 'Pale', texture: 'Smooth_Standard', name: 'Pale (Smooth)', file: '/assets/BASE_SKIN/Pale__Smooth_Standard.png' },
  { id: 'Pale__Cyborg_Metallic_Lines', tone: 'Pale', texture: 'Cyborg_Metallic_Lines', name: 'Pale (Cyborg)', file: '/assets/BASE_SKIN/Pale__Cyborg_Metallic_Lines.png' },
  { id: 'Pale__Alien_Neon_Glow', tone: 'Pale', texture: 'Alien_Neon_Glow', name: 'Pale (Alien Glow)', file: '/assets/BASE_SKIN/Pale__Alien_Neon_Glow.png' },
  { id: 'Pale__Reptilian_Scales', tone: 'Pale', texture: 'Reptilian_Scales', name: 'Pale (Reptilian)', file: '/assets/BASE_SKIN/Pale__Reptilian_Scales.png' },
  
  // Tan
  { id: 'Tan__Smooth_Standard', tone: 'Tan', texture: 'Smooth_Standard', name: 'Tan (Smooth)', file: '/assets/BASE_SKIN/Tan__Smooth_Standard.png' },
  { id: 'Tan__Cyborg_Metallic_Lines', tone: 'Tan', texture: 'Cyborg_Metallic_Lines', name: 'Tan (Cyborg)', file: '/assets/BASE_SKIN/Tan__Cyborg_Metallic_Lines.png' },
  { id: 'Tan__Alien_Neon_Glow', tone: 'Tan', texture: 'Alien_Neon_Glow', name: 'Tan (Alien Glow)', file: '/assets/BASE_SKIN/Tan__Alien_Neon_Glow.png' },
  { id: 'Tan__Reptilian_Scales', tone: 'Tan', texture: 'Reptilian_Scales', name: 'Tan (Reptilian)', file: '/assets/BASE_SKIN/Tan__Reptilian_Scales.png' },

  // Warm Olive
  { id: 'Warm_Olive__Smooth_Standard', tone: 'Warm_Olive', texture: 'Smooth_Standard', name: 'Warm Olive (Smooth)', file: '/assets/BASE_SKIN/Warm_Olive__Smooth_Standard.png' },
  { id: 'Warm_Olive__Cyborg_Metallic_Lines', tone: 'Warm_Olive', texture: 'Cyborg_Metallic_Lines', name: 'Warm Olive (Cyborg)', file: '/assets/BASE_SKIN/Warm_Olive__Cyborg_Metallic_Lines.png' },
  { id: 'Warm_Olive__Alien_Neon_Glow', tone: 'Warm_Olive', texture: 'Alien_Neon_Glow', name: 'Warm Olive (Alien Glow)', file: '/assets/BASE_SKIN/Warm_Olive__Alien_Neon_Glow.png' },
  { id: 'Warm_Olive__Reptilian_Scales', tone: 'Warm_Olive', texture: 'Reptilian_Scales', name: 'Warm Olive (Reptilian)', file: '/assets/BASE_SKIN/Warm_Olive__Reptilian_Scales.png' },

  // Dark Brown
  { id: 'Dark_Brown__Smooth_Standard', tone: 'Dark_Brown', texture: 'Smooth_Standard', name: 'Dark Brown (Smooth)', file: '/assets/BASE_SKIN/Dark_Brown__Smooth_Standard.png' },
  { id: 'Dark_Brown__Cyborg_Metallic_Lines', tone: 'Dark_Brown', texture: 'Cyborg_Metallic_Lines', name: 'Dark Brown (Cyborg)', file: '/assets/BASE_SKIN/Dark_Brown__Cyborg_Metallic_Lines.png' },
  { id: 'Dark_Brown__Alien_Neon_Glow', tone: 'Dark_Brown', texture: 'Alien_Neon_Glow', name: 'Dark Brown (Alien Glow)', file: '/assets/BASE_SKIN/Dark_Brown__Alien_Neon_Glow.png' },
  { id: 'Dark_Brown__Reptilian_Scales', tone: 'Dark_Brown', texture: 'Reptilian_Scales', name: 'Dark Brown (Reptilian)', file: '/assets/BASE_SKIN/Dark_Brown__Reptilian_Scales.png' },
];

export const OUTFITS = [
  { id: 'Cyberpunk_Hoodie', name: 'Cyberpunk Hoodie', file: '/assets/OUTFITS_CLOTHING/Cyberpunk_Hoodie.png' },
  { id: 'Techwear_Jacket', name: 'Techwear Jacket', file: '/assets/OUTFITS_CLOTHING/Techwear_Jacket.png' },
  { id: 'Minimalist_Tee', name: 'Minimalist Tee', file: '/assets/OUTFITS_CLOTHING/Minimalist_Tee.png' },
  { id: 'Mecha_Suit_Collar', name: 'Mecha Suit Collar', file: '/assets/OUTFITS_CLOTHING/Mecha_Suit_Collar.png' },
  { id: 'Casual_Kimono', name: 'Casual Kimono', file: '/assets/OUTFITS_CLOTHING/Casual_Kimono.png' },
];

// 25 Full Facial Expression & Eye Combinations
const EXPR_TYPES = [
  { id: 'Stoic_Neutral', name: 'Stoic' },
  { id: 'Confident_Smirk', name: 'Smirk' },
  { id: 'Bored_Lazy', name: 'Bored' },
  { id: 'Aggressive_Ready', name: 'Aggressive' },
  { id: 'Hype_Excited', name: 'Excited' },
];

const EYE_COLS = [
  { id: 'Eyes_Crimson_Red', name: 'Crimson Red', colorHex: '#ef4444' },
  { id: 'Eyes_Emerald_Green', name: 'Emerald Green', colorHex: '#10b981' },
  { id: 'Eyes_Golden_Amber', name: 'Golden Amber', colorHex: '#f59e0b' },
  { id: 'Eyes_Heterochromia_Cyan_Pink', name: 'Heterochromia', colorHex: '#06b6d4' },
  { id: 'Eyes_Violet', name: 'Violet', colorHex: '#8b5cf6' },
];

export const ALL_FACIAL_EXPRESSIONS = [];
EXPR_TYPES.forEach(expr => {
  EYE_COLS.forEach(eye => {
    ALL_FACIAL_EXPRESSIONS.push({
      id: `${expr.id}__${eye.id}`,
      expression: expr.id,
      expressionName: expr.name,
      eyeColor: eye.id,
      eyeColorName: eye.name,
      colorHex: eye.colorHex,
      name: `${expr.name} (${eye.name})`,
      file: `/assets/FACIAL_EXPRESSIONS/${expr.id}__${eye.id}.png`
    });
  });
});

// 25 Full Hair Style & Color Combinations
const STYLES = [
  { id: 'Spiky_Shonen', name: 'Spiky Shonen' },
  { id: 'Cyberpunk_Undercut', name: 'Cyber Undercut' },
  { id: 'Flowing_Long', name: 'Flowing Long' },
  { id: 'Messy_Curtain', name: 'Messy Curtain' },
  { id: 'Bob_Cut', name: 'Bob Cut' },
];

const COLORS = [
  { id: 'Obsidian_Black', name: 'Obsidian Black', colorHex: '#18181b' },
  { id: 'Electric_Blue', name: 'Electric Blue', colorHex: '#0284c7' },
  { id: 'Hot_Pink', name: 'Hot Pink', colorHex: '#ec4899' },
  { id: 'Platinum_Blonde', name: 'Platinum Blonde', colorHex: '#fef08a' },
  { id: 'Neon_Green', name: 'Neon Green', colorHex: '#22c55e' },
];

export const ALL_HAIR_STYLES = [];
STYLES.forEach(style => {
  COLORS.forEach(color => {
    ALL_HAIR_STYLES.push({
      id: `${style.id}__${color.id}`,
      style: style.id,
      styleName: style.name,
      color: color.id,
      colorName: color.name,
      colorHex: color.colorHex,
      name: `${style.name} (${color.name})`,
      file: `/assets/HAIR_STYLES_HAIR_COLOR/${style.id}__${color.id}.png`
    });
  });
});

export const ACCESSORIES = [
  { id: 'none', name: 'None (No Accessory)', file: null },
  { id: 'Cyber_Visor', name: 'Cyber Visor', file: '/assets/ACCESSORIES/Cyber_Visor.png' },
  { id: 'Retro_Sunglasses', name: 'Retro Sunglasses', file: '/assets/ACCESSORIES/Retro_Sunglasses.png' },
  { id: 'Round_Glasses', name: 'Round Glasses', file: '/assets/ACCESSORIES/Round_Glasses.png' },
  { id: 'Neon_Halo', name: 'Neon Halo', file: '/assets/ACCESSORIES/Neon_Halo.png' },
  { id: 'Face_Mask', name: 'Face Mask', file: '/assets/ACCESSORIES/Face_Mask.png' },
  { id: 'Cybernetic_Horns', name: 'Cyber Horns', file: '/assets/ACCESSORIES/Cybernetic_Horns.png' },
  { id: 'Earrings', name: 'Cyber Earrings', file: '/assets/ACCESSORIES/Earrings.png' },
];

export function getSkinFilePath(toneId, textureId) {
  return `/assets/BASE_SKIN/${toneId}__${textureId}.png`;
}

export function getExpressionFilePath(expressionId, eyeColorId) {
  return `/assets/FACIAL_EXPRESSIONS/${expressionId}__${eyeColorId}.png`;
}

export function getHairFilePath(styleId, colorId) {
  return `/assets/HAIR_STYLES_HAIR_COLOR/${styleId}__${colorId}.png`;
}
