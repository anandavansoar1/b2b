import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useResponsive } from '../utils/responsive';
import { COLORS, FONT_NAMES } from '../theme/colors';

const StatCard = ({ label, value, color, icon }) => {
  const { isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();

  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(169, 87, 63, 0.2)' : '#F0E6DF',
          borderWidth: 1,
          borderTopWidth: 4,
          borderTopColor: color,
          borderRadius: rd(20),
          padding: pd(16),
        },
      ]}
    >
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15`, borderRadius: rd(12), padding: pd(8), marginBottom: pd(10) }]}>
        <Ionicons name={icon} size={fs(18)} color={color} />
      </View>
      <Text style={[styles.statValue, { color: color, fontSize: fs(24) }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: isDarkMode ? '#AAAAAA' : COLORS.textSecondary, fontSize: fs(11) }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontFamily: FONT_NAMES.bold,
    letterSpacing: -0.5,
  },
  statLabel: {
    marginTop: 2,
    textAlign: 'center',
    fontFamily: FONT_NAMES.medium,
  },
});

export default StatCard;
