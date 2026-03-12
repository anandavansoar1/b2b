import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, hp } = useResponsive();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Helper to parse price strings like "₹24,500" to calculate total
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const numericStr = priceStr.replace(/[^\d]/g, '');
    return parseInt(numericStr, 10) || 0;
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (parsePrice(item.price) * item.quantity);
    }, 0);
    return `₹${total.toLocaleString('en-IN')}`;
  };

  const handleIncrement = (item) => {
    // addToCart expects the full item object to bump the count properly based on existing item
    dispatch(addToCart(item));
  };

  const handleDecrement = (id) => {
    dispatch(removeFromCart(id));
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', borderRadius: rd(18) }]}> 
      <View style={[styles.imageContainer, { backgroundColor: isDarkMode ? '#3A3A3A' : '#F8F4EA', borderRadius: rd(12) }]}> 
        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, { color: theme.text, fontSize: fs(15) }]} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} activeOpacity={0.7} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={fs(18)} color="#E74C3C" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.itemSku, { color: theme.textSecondary, fontSize: fs(12) }]}>SKU: {item.sku}</Text>
        
        <View style={styles.itemFooter}>
          <Text style={[styles.itemPrice, { color: COLORS.primary, fontSize: fs(16) }]}>{item.price}</Text>

          <View style={[styles.quantityControl, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F0F0F0', borderRadius: rd(10) }]}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)} style={[styles.qtyBtn, { width: pd(32), height: pd(32) }]} activeOpacity={0.7}>
              <Ionicons name="remove" size={fs(16)} color={theme.text} />
            </TouchableOpacity>
            
            <Text style={[styles.qtyText, { color: theme.text, fontSize: fs(14), minWidth: pd(24) }]}>{item.quantity}</Text>

            <TouchableOpacity onPress={() => handleIncrement(item)} style={[styles.qtyBtn, { width: pd(32), height: pd(32) }]} activeOpacity={0.7}>
              <Ionicons name="add" size={fs(16)} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      
      <Header
        title="My Cart"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightElement={
          cartItems.length > 0 ? (
            <TouchableOpacity onPress={() => dispatch(clearCart())} activeOpacity={0.7}>
              <Text style={{ color: '#E74C3C', fontSize: fs(14), fontWeight: '600' }}>Clear</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {cartItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: isDarkMode ? '#2C2C2C' : '#F8F4EA', width: pd(120), height: pd(120), borderRadius: rd(60) }]}>
            <Ionicons name="cart-outline" size={fs(50)} color={COLORS.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text, fontSize: fs(22), marginTop: pd(24) }]}>Your Cart is Empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary, fontSize: fs(15), marginTop: pd(12) }]}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity 
            style={[styles.startShoppingBtn, { backgroundColor: COLORS.primary, borderRadius: rd(14), marginTop: pd(32), paddingVertical: pd(16), paddingHorizontal: pd(32) }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Catalogue')}
          >
            <Text style={{ color: '#FFF', fontSize: fs(16), fontWeight: '700' }}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            contentContainerStyle={{ padding: pd(16), paddingBottom: pd(100) }}
            showsVerticalScrollIndicator={false}
          />

          <View style={[styles.checkoutContainer, { 
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            borderTopColor: isDarkMode ? '#333' : '#F0F0F0',
            paddingHorizontal: pd(24),
            paddingVertical: pd(20),
            paddingBottom: Platform.OS === 'ios' ? pd(34) : pd(24)
          }]}>
            <View style={styles.totalRow}>
              <Text style={{ color: theme.textSecondary, fontSize: fs(15), fontWeight: '500' }}>Total ({totalQuantity} items):</Text>
              <Text style={{ color: theme.text, fontSize: fs(24), fontWeight: '800' }}>{calculateTotal()}</Text>
            </View>

            <TouchableOpacity 
              style={[styles.checkoutBtn, { backgroundColor: COLORS.primary, borderRadius: rd(16), marginTop: pd(16), paddingVertical: pd(18) }]}
              activeOpacity={0.85}
              onPress={() => {
                alert('Proceeding to checkout!');
                // Implement checkout navigation logic
              }}
            >
              <Text style={{ color: '#FFF', fontSize: fs(17), fontWeight: '700' }}>Checkout Now</Text>
              <Ionicons name="arrow-forward" size={fs(20)} color="#FFF" style={{ marginLeft: pd(8) }} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  deleteBtn: {
    padding: 4,
  },
  itemSku: {
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontWeight: '800',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontWeight: '800',
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
  startShoppingBtn: {
    shadowColor: '#CDA836',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  checkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  }
});

export default CartScreen;
