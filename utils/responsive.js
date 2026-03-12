import { useState, useEffect, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

const BREAKPOINTS = {
  sm: 0,      // phones
  md: 600,    // large phones / small tablets (portrait)
  lg: 840,    // iPads / tablets (landscape)
  xl: 1080,   // Desktop / extra large screens
};

export const getBreakpoint = (width) => {
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  return 'sm';
};

export const isTabletLike = (width, height) => {
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);
  // iPad / big Android tablets usually have min dimension > 768px in their scaled space
  return (minDim >= 700 && maxDim >= 1000) || (Platform.OS === 'ipad') || (minDim > 600);
};

export const useResponsive = () => {
  const compute = () => {
    const { width, height, fontScale } = Dimensions.get('window');
    const orientation = width >= height ? 'landscape' : 'portrait';
    const bp = getBreakpoint(width);
    const isTablet = isTabletLike(width, height);
    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';
    const isWeb = Platform.OS === 'web';

    // Multipliers for generic scaling based on breakpoints
    const fontMult = bp === 'sm' ? 1.0 : bp === 'md' ? 1.05 : bp === 'lg' ? 1.1 : 1.15;
    const paddingMult = bp === 'sm' ? 1.0 : bp === 'md' ? 1.15 : bp === 'lg' ? 1.25 : 1.35;
    const radiusMult = bp === 'sm' ? 1.0 : bp === 'md' ? 1.05 : bp === 'lg' ? 1.1 : 1.15;

    // Helper percentages
    const wp = (percent) => (width * percent) / 100;
    const hp = (percent) => (height * percent) / 100;

    return {
      width,
      height,
      orientation,
      bp,
      isTablet,
      isIOS,
      isAndroid,
      isWeb,
      fontScale,
      fontMult,
      paddingMult,
      radiusMult,
      wp,
      hp,
    };
  };

  const [state, setState] = useState(compute);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setState(compute());
    });
    return () => {
      if (subscription?.remove) {
        subscription.remove();
      }
    };
  }, []);

  // Quick helper functions returning scaled numbers
  // fs = FontSize, pd = Padding/Margin, rd = BorderRadius, ic = IconSize
  const fs = useMemo(() => (size) => Math.round(size * state.fontMult), [state.fontMult]);
  const pd = useMemo(() => (size) => Math.round(size * state.paddingMult), [state.paddingMult]);
  const rd = useMemo(() => (size) => Math.round(size * state.radiusMult), [state.radiusMult]);
  const ic = useMemo(() => (size) => Math.round(size * state.fontMult * 1.05), [state.fontMult]);

  // Constrains width dynamically so tablets aren't excessively wide:
  const contentWidth = state.isTablet ? Math.min(state.width * 0.7, 500) : '100%';

  return { ...state, fs, pd, rd, ic, contentWidth };
};
