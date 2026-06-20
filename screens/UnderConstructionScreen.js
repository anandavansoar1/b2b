import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const UnderConstructionScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header
        title="Coming Soon"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#2C2C2C' : '#F8F4EA' }]}>
          <Ionicons name="construct-outline" size={fs(60)} color={COLORS.primary} />
        </View>
        <Text style={[styles.title, { color: theme.text, fontSize: fs(24) }]}>
          Under Construction
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary, fontSize: fs(15) }]}>
          We are working hard to bring this feature to you in our upcoming update. Stay tuned!
        </Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: COLORS.primary, borderRadius: rd(14) }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.btnText, { fontSize: fs(16) }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default UnderConstructionScreen;
