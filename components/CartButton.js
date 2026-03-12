import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';

const CartButton = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { fs, pd, rd } = useResponsive();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const scaleValue = useRef(new Animated.Value(1)).current;
  const prevQuantity = useRef(totalQuantity);

  useEffect(() => {
    // Animate when the quantity increases/decreases
    if (totalQuantity !== prevQuantity.current) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
      prevQuantity.current = totalQuantity;
    }
  }, [totalQuantity]);

  return (
    <TouchableOpacity 
      style={{ position: 'relative', padding: pd(4) }}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Cart')}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Ionicons name="cart-outline" size={fs(26)} color={COLORS.primary} />
        {totalQuantity > 0 && (
          <View style={{
            position: 'absolute',
            top: -pd(4),
            right: -pd(6),
            backgroundColor: '#E74C3C',
            borderRadius: rd(10),
            minWidth: pd(18),
            height: pd(18),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: pd(4),
            borderWidth: 1.5,
            borderColor: isDarkMode ? '#1E1E1E' : COLORS.backgroundLight,
          }}>
            <Text style={{ color: '#fff', fontSize: fs(10), fontWeight: 'bold' }}>
              {totalQuantity > 99 ? '99+' : totalQuantity}
            </Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CartButton;
