// Smart Pricing Engine Constants
export const BASE_RATES = {
  TOP_TIER: 15,    // $15/day
  MID_TIER: 10,    // $10/day
  BOTTOM_TIER: 5,  // $5/day
} as const;

export const SLOT_MULTIPLIERS = {
  TOP: 2.0,
  MID: 1.3,
  BOTTOM: 1.0,
} as const;

export const GEO_MULTIPLIERS = {
  // Tier 1: Premium markets
  US: 1.5,
  UK: 1.5,
  DE: 1.5,
  CA: 1.4,
  AU: 1.4,
  
  // Tier 2: Growing markets
  IN: 1.2,
  BR: 1.2,
  MX: 1.1,
  FR: 1.3,
  IT: 1.3,
  ES: 1.2,
  
  // Tier 3: Emerging markets
  NG: 0.8,
  KE: 0.7,
  GH: 0.7,
  ZA: 0.9,
  EG: 0.8,
  
  // Default for unlisted countries
  DEFAULT: 1.0,
} as const;

export const TIME_MULTIPLIERS = {
  PRIME_TIME: 1.4,    // 6 PM - 10 PM
  BUSINESS_HOURS: 1.2, // 9 AM - 5 PM
  EVENING: 1.1,       // 5 PM - 9 PM
  MORNING: 1.0,       // 6 AM - 9 AM
  LATE_NIGHT: 0.6,    // 10 PM - 6 AM
  WEEKEND: 1.1,       // Saturday & Sunday
} as const;

export const FORMAT_MULTIPLIERS = {
  VIDEO: 1.5,
  IMAGE: 1.0,
  TEXT: 0.8,
  AI_GENERATED_BONUS: 10, // Flat $10 bonus
} as const;

export const DURATION_DISCOUNTS = {
  1: 1.0,    // No discount for 1 day
  3: 0.95,   // 5% discount for 3+ days
  7: 0.90,   // 10% discount for 1+ week
  14: 0.85,  // 15% discount for 2+ weeks
  30: 0.80,  // 20% discount for 1+ month
} as const;

export const DEMAND_MULTIPLIERS = {
  VERY_HIGH: 1.8,
  HIGH: 1.4,
  MEDIUM: 1.0,
  LOW: 0.8,
  VERY_LOW: 0.6,
} as const;

export const AD_SLOT_TYPES = {
  TOP_CENTER: 'top_center',
  TOP_LEFT: 'top_left',
  TOP_RIGHT: 'top_right',
  MID_CENTER: 'mid_center',
  MID_LEFT: 'mid_left',
  MID_RIGHT: 'mid_right',
  BOTTOM_CENTER: 'bottom_center',
  BOTTOM_LEFT: 'bottom_left',
  BOTTOM_RIGHT: 'bottom_right',
  MOBILE_BANNER: 'mobile_banner',
  MOBILE_INTERSTITIAL: 'mobile_interstitial',
} as const;

export const SLOT_TIER_MAPPING = {
  [AD_SLOT_TYPES.TOP_CENTER]: 'TOP',
  [AD_SLOT_TYPES.TOP_LEFT]: 'TOP',
  [AD_SLOT_TYPES.TOP_RIGHT]: 'TOP',
  [AD_SLOT_TYPES.MID_CENTER]: 'MID',
  [AD_SLOT_TYPES.MID_LEFT]: 'MID',
  [AD_SLOT_TYPES.MID_RIGHT]: 'MID',
  [AD_SLOT_TYPES.BOTTOM_CENTER]: 'BOTTOM',
  [AD_SLOT_TYPES.BOTTOM_LEFT]: 'BOTTOM',
  [AD_SLOT_TYPES.BOTTOM_RIGHT]: 'BOTTOM',
  [AD_SLOT_TYPES.MOBILE_BANNER]: 'BOTTOM',
  [AD_SLOT_TYPES.MOBILE_INTERSTITIAL]: 'MID',
} as const;

export type SlotType = keyof typeof AD_SLOT_TYPES;
export type SlotTier = keyof typeof SLOT_MULTIPLIERS;
export type CountryCode = keyof typeof GEO_MULTIPLIERS;
export type TimeSlot = keyof typeof TIME_MULTIPLIERS;
export type AdFormat = keyof typeof FORMAT_MULTIPLIERS;
export type DemandLevel = keyof typeof DEMAND_MULTIPLIERS;

