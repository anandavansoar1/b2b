// ZohriERP B2B - Brand Color Theme & Palette
// Official Zohri Terracotta Luxury Brand Identity

import { FONT_NAMES } from './typography';

export { FONT_NAMES };

export const BRAND_COLORS = {
  // Official Swatches
  terracotta: '#A9573F',    // Primary Brand Color (Terracotta)
  plum: '#5A2A4E',          // Secondary Brand Color (Deep Plum)
  warmSand: '#D9997B',      // Soft Accent (Warm Sand)
  cream: '#FAF0EB',         // Surface & Highlight (Warm Cream)
  softTint: '#FAF0EB',

  // Functional Mappings
  primary: '#A9573F',
  secondary: '#5A2A4E',
  accent: '#D9997B',
  surface: '#FAF0EB',
  surfaceLight: '#FFFFFF',
  background: '#F9F8F5',

  // Dark Mode Tokens
  darkBackground: '#121212',
  darkSurface: '#1E1E1E',
  darkSurfaceElevated: '#27272A',
  darkBorder: 'rgba(169, 87, 63, 0.25)',

  // Neutrals & Status
  textDark: '#2D1B15',
  textMuted: '#7A665E',
  textLight: '#FFFFFF',
  white: '#FFFFFF',
  borderLight: '#F0E6DF',
  divider: '#F0E6DF',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
};

export const BRAND_GRADIENTS = {
  brand: ['#A9573F', '#5A2A4E'],
  primary: ['#B85C42', '#A9573F'],
  hero: ['#B85C42', '#A9573F', '#8F3E28'],
  plum: ['#5A2A4E', '#7B356A'],
  accent: ['#A9573F', '#D9997B'],
  warm: ['#D9997B', '#FAF0EB'],
  surface: ['#FFFFFF', '#FAF0EB'],
  dark: ['#1E1E1E', '#121212'],
  header: ['#B85C42', '#A9573F'],
};

export const COLORS = {
  // ─── Primary Brand Colors ─────────────────────────────────────
  primary: '#A9573F',        // Terracotta – primary accents, CTAs, highlights
  primaryDark: '#8F3E28',    // Deeper terracotta for pressed states
  primaryLight: '#FAF0EB',   // Soft warm cream – accent backgrounds

  // ─── Backgrounds ──────────────────────────────────────────────
  backgroundLight: '#F9F8F5', // Warm luxury off-white
  backgroundDark: '#121212',  // Modern deep dark mode
  backgroundCard: '#FFFFFF',  // Crisp white card surfaces
  backgroundCardDark: '#1E1E1E', // Elevated dark cards

  // ─── Text ─────────────────────────────────────────────────────
  textPrimary: '#2D1B15',    // Deep charcoal terracotta
  textSecondary: '#7A665E',  // Muted terracotta gray
  textLight: '#FFFFFF',      // White for dark mode
  textMuted: '#A09088',      // Soft muted gray

  // ─── UI Elements ──────────────────────────────────────────────
  border: '#F0E6DF',         // Subtle terracotta border
  borderDark: 'rgba(169, 87, 63, 0.25)',
  inputBackground: '#FFFFFF',
  inputBackgroundDark: '#27272A',
  button: '#A9573F',
  buttonDark: '#A9573F',

  // ─── Status & Feedback ────────────────────────────────────────
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  info: '#3B82F6',

  // ─── Shadows ──────────────────────────────────────────────────
  shadow: '#A9573F',

  // ─── Accent ───────────────────────────────────────────────────
  gold: '#A9573F',
  terracotta: '#A9573F',
  plum: '#5A2A4E',
  warmSand: '#D9997B',
};

// Light Theme Object
export const lightTheme = {
  background: COLORS.backgroundLight,
  text: COLORS.textPrimary,
  primary: COLORS.primary,
  button: COLORS.button,
  inputBackground: COLORS.inputBackground,
  border: COLORS.border,
  card: COLORS.backgroundCard,
  textSecondary: COLORS.textSecondary,
  accent: BRAND_COLORS.warmSand,
  surface: BRAND_COLORS.cream,
};

// Dark Theme Object
export const darkTheme = {
  background: COLORS.backgroundDark,
  text: COLORS.textLight,
  primary: COLORS.primary,
  button: COLORS.buttonDark,
  inputBackground: COLORS.inputBackgroundDark,
  border: COLORS.borderDark,
  card: COLORS.backgroundCardDark,
  textSecondary: COLORS.textMuted,
  accent: BRAND_COLORS.warmSand,
  surface: BRAND_COLORS.darkSurface,
};

export default COLORS;
