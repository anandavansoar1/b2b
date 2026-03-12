import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ 
  title, 
  subtitle, 
  subtitleTop = false,
  showBack, 
  onBackPress, 
  rightElement, 
}) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: isDarkMode ? '#1E1E1E' : COLORS.backgroundLight,
          paddingHorizontal: pd(20),
          paddingTop: Platform.OS === 'android' ? pd(48) : pd(56),
          paddingBottom: pd(16),
          borderBottomRightRadius: rd(24),
          borderBottomLeftRadius: rd(24),
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1E1E1E' : COLORS.backgroundLight}
      />

      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress} 
            activeOpacity={0.7}
          >
            <Ionicons 
              name="chevron-back" 
              size={fs(28)} 
              color={COLORS.primary} 
            />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          {subtitle && subtitleTop && (
            <Text style={[styles.subtitle, { color: theme.textSecondary, fontSize: fs(13), marginBottom: 2 }]}>
              {subtitle}
            </Text>
          )}
          <Text style={[styles.title, { color: theme.text, fontSize: fs(24) }]}>
            {title}
          </Text>
          {subtitle && !subtitleTop && (
            <Text style={[styles.subtitle, { color: theme.textSecondary, fontSize: fs(12), marginTop: 2 }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Right – Action */}
      <View style={styles.rightSide}>
        {rightElement ? (
          rightElement
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 100,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontWeight: '500',
  },
  rightSide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
