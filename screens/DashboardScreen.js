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
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../components/StatCard';

const DashboardScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();

  const menuItems = [
    { id: 0, icon: '📖', title: 'Catalogue', subtitle: 'Browse products & pricing', screen: 'Catalogue' },
    { id: 2, icon: '📦', title: 'My Orders', subtitle: 'Track your current orders', screen: 'MyOrders' },
    { id: 6, icon: '⚙️', title: 'Settings', subtitle: 'App preferences & account', screen: 'Settings' },
  ];

  const stats = [
    { label: 'Today Orders', value: '12', color: COLORS.primary, icon: 'cart-outline' },
    { label: 'Pending', value: '5', color: COLORS.warning, icon: 'time-outline' },
    { label: 'Delivered', value: '7', color: COLORS.success, icon: 'checkmark-done-outline' },
  ];

  const recentActivity = [
    { id: 1, title: 'Order Delivered', time: '2h ago', desc: 'Order #ORD-5481 has been delivered.', icon: 'checkmark-circle', color: COLORS.success },
    { id: 2, title: 'Stock Update', time: '5h ago', desc: 'Gold Bangle Set is back in stock.', icon: 'refresh-circle', color: COLORS.primary },
    { id: 3, title: 'New Product', time: '1d ago', desc: 'Emerald Rings collection added.', icon: 'star-circle', color: COLORS.info || '#3498DB' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header
        title="Goldshopper B2B"
        subtitle="Welcome back 👋"
        subtitleTop={true}
        showBack={false}
        rightElement={
          <TouchableOpacity 
            onPress={toggleTheme} 
            activeOpacity={0.7}
            style={[styles.themeBtn, { 
              width: pd(44), 
              height: pd(44), 
              borderRadius: rd(14),
              backgroundColor: isDarkMode ? '#3A3A3A' : '#FFFFFF',
            }]}
          >
            <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={fs(22)} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { alignItems: 'center', flexGrow: 1 }]}
      >
        <View style={{ width: contentWidth }}>

          {/* ── Stats Row ─────────────────────── */}
          <View style={styles.statsRow}>
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                icon={stat.icon}
              />
            ))}
          </View>

          {/* ── Quick Actions ────────────────── */}
          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fs(18) }]}>Quick Actions</Text>

          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <Card
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => navigation?.navigate && navigation.navigate(item.screen)}
                style={{ marginHorizontal: 0, marginBottom: pd(12) }}
              />
            ))}
          </View>

          {/* ── Recent Activity ────────────────── */}
          <View style={[styles.sectionHeader, { marginTop: pd(10) }]}>
            <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fs(18), marginHorizontal: 0 }]}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: fs(13) }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.activityContainer, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderRadius: rd(24), padding: pd(4), marginTop: pd(4) }]}>
            {recentActivity.map((activity, index) => (
              <View 
                key={activity.id} 
                style={[
                  styles.activityItem, 
                  { 
                    paddingVertical: pd(16), 
                    paddingHorizontal: pd(16), 
                    borderBottomWidth: index === recentActivity.length - 1 ? 0 : 1, 
                    borderBottomColor: isDarkMode ? '#3A3A3A' : '#F1F1F1' 
                  }
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}12`, borderRadius: rd(14), width: pd(46), height: pd(46) }]}>
                  <Ionicons name={activity.icon} size={fs(24)} color={activity.color} />
                </View>
                <View style={{ flex: 1, marginLeft: pd(16) }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: theme.text, fontSize: fs(15), fontWeight: '700' }}>{activity.title}</Text>
                    <Text style={{ color: theme.textSecondary, fontSize: fs(11), fontWeight: '600' }}>{activity.time}</Text>
                  </View>
                  <Text style={{ color: theme.textSecondary, fontSize: fs(13), marginTop: pd(2) }} numberOfLines={1}>
                    {activity.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </View>

        <View style={[styles.footer, { marginTop: 'auto', paddingBottom: pd(110), width: '100%' }]}>
          <Text style={{ color: theme.textSecondary, fontSize: fs(12), textAlign: 'center', opacity: 0.7 }}>
            Goldshopper B2B Portal v1.0.0
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
    paddingHorizontal: 16,
  },
  themeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  menuGrid: {
    marginBottom: 16,
  },
  activityContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default DashboardScreen;
