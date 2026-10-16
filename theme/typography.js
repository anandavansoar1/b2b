/**
 * ZohriERP B2B Typography System
 * - Headings & Titles: DM Sans Bold (DMSans_700Bold)
 * - Subheadings & Accents: DM Sans SemiBold / Medium (DMSans_600SemiBold / DMSans_500Medium)
 * - Body & Paragraphs: DM Sans Regular (DMSans_400Regular)
 */

import { Platform } from 'react-native';

export const FONT_NAMES = {
  bold: 'DMSans_700Bold',
  semiBold: 'DMSans_600SemiBold',
  medium: 'DMSans_500Medium',
  regular: 'DMSans_400Regular',

  // Aliases
  headlineBold: 'DMSans_700Bold',
  bodyRegular: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
};

export const TYPOGRAPHY = {
  heroHeadline: {
    fontFamily: FONT_NAMES.bold,
    fontSize: 26,
    letterSpacing: 0.3,
  },
  headline: {
    fontFamily: FONT_NAMES.bold,
    fontSize: 20,
    letterSpacing: 0.25,
  },
  headlineMedium: {
    fontFamily: FONT_NAMES.semiBold,
    fontSize: 18,
    letterSpacing: 0.2,
  },
  subheading: {
    fontFamily: FONT_NAMES.semiBold,
    fontSize: 16,
    letterSpacing: 0.15,
  },
  body: {
    fontFamily: FONT_NAMES.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyMedium: {
    fontFamily: FONT_NAMES.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONT_NAMES.medium,
    fontSize: 12,
  },
  buttonText: {
    fontFamily: FONT_NAMES.bold,
    fontSize: 15,
    letterSpacing: 0.3,
  },
  amountLarge: {
    fontFamily: FONT_NAMES.bold,
    fontSize: 24,
  },
  amountMedium: {
    fontFamily: FONT_NAMES.bold,
    fontSize: 18,
  },
};

export default TYPOGRAPHY;
