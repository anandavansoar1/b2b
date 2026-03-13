import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const MyOrdersScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Pending', 'Processing', 'Delivered'];

  const orders = [
    { id: 'ORD-5481', status: 'Delivered', items: 3, total: '₹55,000', date: 'Mar 08, 2026', icon: 'checkmark-circle' },
    { id: 'ORD-5482', status: 'Pending', items: 1, total: '₹12,400', date: 'Mar 10, 2026', icon: 'time' },
    { id: 'ORD-5483', status: 'Processing', items: 5, total: '₹1,25,000', date: 'Mar 09, 2026', icon: 'sync' },
  ];

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'Pending': return { bg: '#FFF3E0', text: '#E65100' };
      case 'Processing': return { bg: '#E3F2FD', text: '#1565C0' };
      default: return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header
        title="My Orders"
        subtitle="Track your current orders"
        showBack={false}
      />

      <View style={{ width: contentWidth, alignSelf: 'center' }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.tabsContainer, { paddingHorizontal: pd(16) }]}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: activeTab === tab ? COLORS.primary : (isDarkMode ? '#2C2C2C' : '#FFFFFF'),
                  borderColor: isDarkMode ? '#3A3A3A' : '#E5E7EB',
                  borderWidth: activeTab === tab ? 0 : 1,
                  paddingHorizontal: pd(20),
                  paddingVertical: pd(8),
                  borderRadius: rd(20),
                }
              ]}
            >
              <Text 
                style={{ 
                  color: activeTab === tab ? '#FFFFFF' : theme.textSecondary,
                  fontWeight: activeTab === tab ? '700' : '500',
                  fontSize: fs(13)
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { alignItems: 'center' }]} showsVerticalScrollIndicator={false}>
        <View style={{ width: contentWidth, paddingHorizontal: pd(16) }}>
          {filteredOrders.map((order, idx) => {
            const statusConfig = getStatusColor(order.status);
            return (
              <View
                key={idx}
                style={[
                  styles.orderCard,
                  {
                    backgroundColor: isDarkMode ? '#2C2C2C' : COLORS.backgroundCard,
                    borderRadius: rd(20),
                    padding: pd(18),
                    marginBottom: pd(16),
                  },
                ]}
              >
                <View style={styles.headerRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#3A3A3A' : '#F5F0E4', borderRadius: rd(12), width: pd(40), height: pd(40) }]}>
                      <Ionicons name="cube-outline" size={fs(20)} color={COLORS.primary} />
                    </View>
                    <View style={{ marginLeft: pd(12) }}>
                      <Text style={{ fontSize: fs(15), fontWeight: '700', color: theme.text }}>
                        {order.id}
                      </Text>
                      <Text style={{ fontSize: fs(12), color: theme.textSecondary, marginTop: pd(2) }}>
                        {order.date}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? '#1E1E1E' : statusConfig.bg, borderRadius: rd(8), paddingHorizontal: pd(10), paddingVertical: pd(4) }]}>
                    <Text style={{ fontSize: fs(11), fontWeight: '700', color: isDarkMode ? statusConfig.text : statusConfig.text }}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: isDarkMode ? '#3A3A3A' : '#F3F4F6', marginVertical: pd(14) }]} />

                <View style={styles.detailsRow}>
                  <View>
                    <Text style={{ fontSize: fs(12), color: theme.textSecondary }}>Items</Text>
                    <Text style={{ fontSize: fs(14), fontWeight: '600', color: theme.text, marginTop: pd(2) }}>{order.items} Products</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: fs(12), color: theme.textSecondary }}>Total Amount</Text>
                    <Text style={{ fontSize: fs(16), fontWeight: '800', color: COLORS.primary, marginTop: pd(2) }}>{order.total}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: pd(16), gap: pd(10) }}>
                  <TouchableOpacity style={[styles.actionBtn, { flex: 1, backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF', borderColor: isDarkMode ? '#3A3A3A' : '#E5E7EB', borderWidth: 1, borderRadius: rd(10), paddingVertical: pd(10) }]}>
                    <Text style={{ textAlign: 'center', fontSize: fs(13), fontWeight: '600', color: theme.text }}>View Details</Text>
                  </TouchableOpacity>
                  {order.status === 'Delivered' && (
                    <TouchableOpacity style={[styles.actionBtn, { flex: 1, backgroundColor: COLORS.primary, borderRadius: rd(10), paddingVertical: pd(10) }]}>
                      <Text style={{ textAlign: 'center', fontSize: fs(13), fontWeight: '600', color: '#FFFFFF' }}>Reorder</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

          {filteredOrders.length === 0 && (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconBox, { backgroundColor: isDarkMode ? '#2C2C2C' : '#F5F5F5', borderRadius: rd(40) }]}>
                <Ionicons name="document-text-outline" size={fs(40)} color={COLORS.textMuted} />
              </View>
              <Text style={{ fontSize: fs(16), fontWeight: '600', color: theme.text, marginTop: pd(16) }}>
                No orders found
              </Text>
              <Text style={{ fontSize: fs(13), color: theme.textSecondary, marginTop: pd(6), textAlign: 'center' }}>
                You don't have any orders matching the selected filter.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabsContainer: {
    paddingVertical: 14,
    gap: 8,
  },
  tabBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  scrollContent: { paddingBottom: 100 },
  orderCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIconBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyOrdersScreen;
