import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { ThemeProvider } from './theme/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as Updates from 'expo-updates';

import BottomTabs from './navigation/BottomTabs';

import UnderConstructionScreen from './screens/UnderConstructionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  const { isDownloading, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  if (!fontsLoaded || isDownloading || isUpdatePending) {
    return (
      <View style={styles.updateContainer}>
        <ActivityIndicator size="large" color="#A9573F" />
        <Text style={styles.updateText}>
          {isUpdatePending ? 'Restarting app...' : isDownloading ? 'Downloading update...' : 'Loading ZohriERP...'}
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
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
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
    backgroundColor: '#F9F8F5',
  },
  updateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#2D1B15',
    fontFamily: 'DMSans_600SemiBold',
  },
});
