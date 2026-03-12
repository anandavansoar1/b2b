// Goldshopper B2B - Color Theme
// Extracted from Goldshopper Mobile App (utils/colors.js & Pange/ThemeContext.js)

export const COLORS = {
  // ─── Primary Brand Colors ─────────────────────────────────────
  primary: '#C9A25D',        // Gold tone – primary accents, CTAs, highlights
  primaryDark: '#A8843E',    // Deeper gold for pressed states
  primaryLight: '#E8D9C2',   // Light tan – subtle highlights & accent backgrounds

  // ─── Backgrounds ──────────────────────────────────────────────
  backgroundLight: '#F5F0E4', // Warm beige – light mode background
  backgroundDark: '#2B2B2B',  // Soft dark gray – dark mode background
  backgroundCard: '#FFFFFF',  // White card surfaces (light mode)
  backgroundCardDark: '#3A3A3A', // Elevated card (dark mode)

  // ─── Text ─────────────────────────────────────────────────────
  textPrimary: '#4A3F35',    // Deep brown – primary text (light mode)
  textSecondary: '#8D6E63',  // Muted brown – secondary/caption text
  textLight: '#E0E0E0',      // Near-white – text in dark mode
  textMuted: '#D3D3D3',      // Light gray – disabled / placeholder

  // ─── UI Elements ──────────────────────────────────────────────
  border: '#8D6E63',         // Brownish border (light mode)
  borderDark: '#777777',     // Lightened border (dark mode)
  inputBackground: '#FFFFFF',// Input fields (light mode)
  inputBackgroundDark: '#3A3A3A', // Input fields (dark mode)
  button: '#8D6E63',         // Button surface (light mode)
  buttonDark: '#5A4F47',     // Button surface (dark mode)

  // ─── Status & Feedback ────────────────────────────────────────
  danger: '#D32F2F',         // Error / delete actions
  success: '#388E3C',        // Success confirmation
  warning: '#F57C00',        // Warnings
  info: '#1976D2',           // Informational

  // ─── Shadows ──────────────────────────────────────────────────
  shadow: '#000000',

  // ─── Notification / Accent ────────────────────────────────────
  gold: '#FFD700',            // Vibrant gold (notifications, badges)
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
  accent: COLORS.primaryLight,
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
  accent: COLORS.primaryLight,
};

export default COLORS;
