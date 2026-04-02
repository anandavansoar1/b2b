import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  FlatList
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import CartButton from '../components/CartButton';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, hp } = useResponsive();
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((cItem) => cItem.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const [activeIndex, setActiveIndex] = useState(0);

  // Use product.imageUrl provided by normalisation in CatalogueScreen
  const images = product.imageUrl ? [{ uri: product.imageUrl }] : [null];

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    alert('Proceeding to Checkout!');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderImage = ({ item }) => (
    <View style={[styles.imageWrapper, { width, height: hp(45), backgroundColor: isDarkMode ? '#212121' : '#F8F4EA' }]}>
      {item ? (
        <Image
          source={item}
          style={styles.productImage}
          resizeMode="contain"
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="diamond-outline" size={fs(80)} color={COLORS.primary} />
          <Text style={{ color: theme.textSecondary, marginTop: pd(10), fontSize: fs(14) }}>No Image Available</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1E1E1E' : COLORS.backgroundLight}
      />

      <Header
        title="Details"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightElement={<CartButton />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: pd(120) }}
        bounces={false}
      >
        <View style={styles.carouselContainer}>
          <FlatList
            data={images}
            renderItem={renderImage}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Pagination Dots */}
          {images.length > 1 && (
            <View style={[styles.pagination, { bottom: pd(40) }]}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: activeIndex === index ? COLORS.primary : (isDarkMode ? '#555' : '#D1D5DB'),
                      width: activeIndex === index ? pd(18) : pd(8)
                    }
                  ]}
                />
              ))}
            </View>
          )}

          {!product.inStock && (
            <View style={[styles.outOfStockBadge, { borderRadius: rd(8) }]}>
              <Text style={{ color: '#FFF', fontSize: fs(11), fontWeight: '700', letterSpacing: 0.5 }}>OUT OF STOCK</Text>
            </View>
          )}
        </View>

        <View style={[styles.detailsContainer, {
          backgroundColor: isDarkMode ? '#292929' : '#FFFFFF',
          borderTopLeftRadius: rd(30),
          borderTopRightRadius: rd(30),
          marginTop: -pd(25), // Creates the overlapping bottom-sheet effect over the image
          padding: pd(24),
          paddingTop: pd(32),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: isDarkMode ? 0 : 0.05,
          shadowRadius: 10,
          elevation: 10,
        }]}>

          <View style={styles.headerRow}>
            <View style={{ flex: 1, paddingRight: pd(16) }}>
              <Text style={[styles.productName, { color: theme.text, fontSize: fs(24), lineHeight: fs(32) }]}>
                {product.name}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: fs(14), marginTop: pd(6) }}>
                SKU: <Text style={{ color: theme.text, fontWeight: '700' }}>{product.sku}</Text>
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.price, { color: COLORS.primary, fontSize: fs(24) }]}>
                {product.price}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: fs(12), marginTop: pd(4) }}>
                {product.unit}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: isDarkMode ? '#3D3D3D' : '#F0F0F0', marginVertical: pd(24) }]} />

          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fs(18), marginBottom: pd(16) }]}>
            Specifications
          </Text>

          <View style={[styles.specGrid, {
            backgroundColor: isDarkMode ? '#333' : '#F8F9FA',
            borderRadius: rd(20),
            padding: pd(20),
          }]}>
            <SpecItem label="Category" value={product.category.toUpperCase()} theme={theme} fs={fs} />
            <SpecItem label="Weight" value={product.weight} theme={theme} fs={fs} />
            <SpecItem label="Purity" value={product.purity} theme={theme} fs={fs} />
            <SpecItem label="Availability" value={product.inStock ? 'In Stock' : 'Out of Stock'} valueColor={product.inStock ? '#2ECC71' : '#E74C3C'} theme={theme} fs={fs} isLast />
          </View>

          <View style={[styles.divider, { backgroundColor: isDarkMode ? '#3D3D3D' : '#F0F0F0', marginVertical: pd(24) }]} />

          <Text style={[styles.sectionTitle, { color: theme.text, fontSize: fs(18), marginBottom: pd(10) }]}>
            About This Item
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: fs(15), lineHeight: fs(24) }}>
            This exquisite piece features intricate detailing and unmatched craftsmanship. Perfectly suited for those who appreciate fine jewelry. Authentic {" "}
            <Text style={{ fontWeight: '700', color: theme.text }}>{product.purity}</Text> {product.category} weighing <Text style={{ fontWeight: '700', color: theme.text }}>{product.weight}</Text>. Designed to bring elegance and style to any occasion.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, {
        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
        borderTopColor: isDarkMode ? '#3D3D3D' : '#F0F0F0',
        paddingHorizontal: pd(24),
        paddingVertical: pd(16),
        paddingBottom: pd(Platform.OS === 'ios' ? 34 : 20)
      }]}>
        {quantityInCart > 0 ? (
          <View style={[styles.actionBtn, styles.qtyControlContainer, { borderColor: COLORS.primary }]}>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(product.id))} style={styles.qtyControlBtn} activeOpacity={0.7}>
              <Ionicons name="remove" size={fs(22)} color={COLORS.primary} />
            </TouchableOpacity>
            
            <Text style={{ color: COLORS.primary, fontSize: fs(18), fontWeight: '800' }}>
              {quantityInCart}
            </Text>

            <TouchableOpacity onPress={() => dispatch(addToCart(product))} style={styles.qtyControlBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={fs(22)} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.actionBtn, styles.cartActionBtn, { borderColor: COLORS.primary }]}
            disabled={!product.inStock}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={fs(22)} color={COLORS.primary} style={{ marginRight: pd(8) }} />
            <Text style={{ color: COLORS.primary, fontSize: fs(16), fontWeight: '700' }}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionBtn, styles.buyActionBtn, {
            backgroundColor: product.inStock ? COLORS.primary : '#ccc'
          }]}
          disabled={!product.inStock}
          onPress={handleBuyNow}
          activeOpacity={0.9}
        >
          <Text style={{ color: '#fff', fontSize: fs(16), fontWeight: '700' }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SpecItem = ({ label, value, valueColor, theme, fs, isLast }) => (
  <View style={[styles.specItem, isLast && { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
    <Text style={{ color: theme.textSecondary, fontSize: fs(14), flex: 1, fontWeight: '500' }}>{label}</Text>
    <Text style={{ color: valueColor || theme.text, fontSize: fs(14), fontWeight: '700' }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  carouselContainer: {
    position: 'relative',
    zIndex: 1,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '85%',
    height: '85%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    gap: 8,
    zIndex: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(231, 76, 60, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  cartBtn: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
  },
  detailsContainer: {
    zIndex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontWeight: '800',
  },
  price: {
    fontWeight: '800',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  specItem: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.05)', // Fallback for border color
    paddingBottom: 14,
    marginBottom: 14,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
    gap: 16,
    zIndex: 20,
  },
  actionBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartActionBtn: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buyActionBtn: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  qtyControlContainer: {
    borderWidth: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  qtyControlBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProductDetailsScreen;
