import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import Card from '../components/Card';

const DashboardScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();

  const menuItems = [
    { id: 0, icon: '📖', title: 'Catalogue', subtitle: 'Browse products & pricing', screen: 'Catalogue' },
    { id: 2, icon: '📦', title: 'My Orders', subtitle: 'Track your current orders', screen: 'MyOrders' },
    { id: 6, icon: '⚙️', title: 'Settings', subtitle: 'App preferences & account', screen: 'Settings' },
  ];

  const stats = [
    { label: 'Today Orders', value: '12', color: COLORS.primary },
    { label: 'Pending', value: '5', color: COLORS.warning },
    { label: 'Delivered', value: '7', color: COLORS.success },
  ];

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header
        title="Goldshopper B2B"
        subtitle="Welcome back 👋"
        subtitleTop={true}
        rightElement={
          <TouchableOpacity onPress={toggleTheme} style={[styles.themeBtn, { width: pd(44), height: pd(44), borderRadius: rd(22) }]}>
            <Text style={{ fontSize: fs(22) }}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { alignItems: 'center', flexGrow: 1 }]}>
        <View style={{ width: contentWidth }}>

          {/* ── Stats Row ─────────────────────── */}
          <View style={styles.statsRow}>
            {stats.map((stat, idx) => (
              <View
                key={idx}
                style={[
                  styles.statCard,
                  {
                    backgroundColor: isDarkMode ? '#2C2C2C' : COLORS.backgroundCard,
                    borderTopColor: stat.color,
                    borderRadius: rd(14),
                    padding: pd(14),
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: stat.color, fontSize: fs(26) }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary, fontSize: fs(11) }]}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* ── Menu Cards ────────────────────── */}
          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fs(16) }]}>Quick Actions</Text>

          {menuItems.map((item) => (
            <Card
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={() => navigation?.navigate && navigation.navigate(item.screen)}
            />
          ))}

        </View>

        <View style={[styles.footer, { marginTop: 'auto', paddingBottom: 20, width: '100%' }]}>
          <Text style={{ color: theme.textSecondary, fontSize: fs(12), textAlign: 'center' }}>
            Goldshopper B2B v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
  },
});

export default DashboardScreen;
