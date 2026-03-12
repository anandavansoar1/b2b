import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './theme/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import CatalogueScreen from './screens/CatalogueScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import SettingsScreen from './screens/SettingsScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as Updates from 'expo-updates';


const Stack = createNativeStackNavigator();

export default function App() {
  const { isDownloading, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  if (isDownloading || isUpdatePending) {
    return (
      <View style={styles.updateContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.updateText}>
          {isUpdatePending ? 'Restarting app...' : 'Downloading update...'}
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >

            
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Catalogue" component={CatalogueScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  updateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0E4',
  },
  updateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
