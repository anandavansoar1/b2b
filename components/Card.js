import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_NAMES } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { useResponsive } from '../utils/responsive';

const Card = ({ title, subtitle, icon, onPress, style }) => {
  const { isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(169, 87, 63, 0.2)' : '#F0E6DF',
          borderWidth: 1,
          shadowColor: COLORS.primary,
          borderRadius: rd(16),
          padding: pd(16),
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <View style={[styles.iconContainer, { width: pd(46), height: pd(46), borderRadius: rd(14), marginRight: pd(14) }]}>
          <Text style={[styles.icon, { fontSize: fs(22) }]}>{icon}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: isDarkMode ? COLORS.textLight : COLORS.textPrimary, fontSize: fs(15) }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.textMuted : COLORS.textSecondary, fontSize: fs(13) }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.arrowContainer}>
        <Text style={{ color: COLORS.primary, fontSize: fs(18) }}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: FONT_NAMES.bold,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONT_NAMES.medium,
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});

export default Card;
