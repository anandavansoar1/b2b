import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import { Platform } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import CatalogueScreen from '../screens/CatalogueScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();
  const insets = useSafeAreaInsets();

  const tabHeight = Platform.OS === 'ios' ? pd(85) + insets.bottom : pd(70) + (insets.bottom > 0 ? insets.bottom : pd(10));

  return (
    <Tab.Navigator
      initialRouteName="Catalogue"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Catalogue') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'MyOrders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }
          return <Ionicons name={iconName} size={fs(22)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: tabHeight,
          paddingBottom: insets.bottom > 0 ? insets.bottom : pd(12),
          paddingTop: pd(12),
          borderTopLeftRadius: rd(30),
          borderTopRightRadius: rd(30),
        },
        tabBarLabelStyle: {
          fontSize: fs(11),
          fontWeight: '700',
          marginTop: pd(4),
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Catalogue" 
        component={CatalogueScreen} 
        options={{ tabBarLabel: 'Catalogue' }}
      />
      <Tab.Screen 
        name="MyOrders" 
        component={MyOrdersScreen} 
        options={{ tabBarLabel: 'My Orders' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
