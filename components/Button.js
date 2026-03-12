import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';

const Button = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'outline' | 'danger'
  loading = false,
  style,
  textStyle,
}) => {
  const { fs, pd, rd } = useResponsive();

  const getBgColor = () => {
    if (variant === 'primary') return COLORS.primary;
    if (variant === 'danger') return COLORS.danger;
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'outline') return COLORS.primary;
    return '#FFFFFF';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return COLORS.primary;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          paddingVertical: pd(14),
          paddingHorizontal: pd(24),
          borderRadius: rd(14),
        },
        variant !== 'outline' && styles.primaryShadow,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={[styles.text, { color: getTextColor(), fontSize: fs(15) }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  primaryShadow: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default Button;
