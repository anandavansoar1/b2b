import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import CartButton from '../components/CartButton';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';


// ─── Sample product data ────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'gold', label: '🪙 Gold' },
  { id: 'silver', label: '🥈 Silver' },
  { id: 'diamond', label: '💎 Diamond' },
  { id: 'platinum', label: '⬜ Platinum' },
  { id: 'gemstone', label: '🔮 Gemstone' },
];

const PRODUCTS = [
  { id: '1', name: 'Classic Gold Ring', sku: 'GR-0012', category: 'gold', price: '₹24,500', unit: 'per piece', weight: '5.2g', purity: '22K', inStock: true, image: require('../assets/gold_ring.png') },
  { id: '2', name: 'Diamond Solitaire', sku: 'DS-0045', category: 'diamond', price: '₹1,85,000', unit: 'per piece', weight: '3.8g', purity: 'VS1', inStock: true, image: require('../assets/diamond_solitaire.png') },
  { id: '3', name: 'Silver Bracelet', sku: 'SB-0078', category: 'silver', price: '₹3,200', unit: 'per piece', weight: '18g', purity: '92.5%', inStock: false, image: require('../assets/silver_bracelet.png') },
  { id: '4', name: 'Gold Bangle Set', sku: 'GB-0031', category: 'gold', price: '₹62,000', unit: 'per set', weight: '22g', purity: '18K', inStock: true, image: require('../assets/gold_bangles.png') },
  { id: '5', name: 'Platinum Chain', sku: 'PC-0019', category: 'platinum', price: '₹45,000', unit: 'per piece', weight: '8g', purity: '95%', inStock: true, image: require('../assets/platinum_chain.png') },
  { id: '6', name: 'Ruby Pendant', sku: 'RP-0056', category: 'gemstone', price: '₹28,000', unit: 'per piece', weight: '4.1g', purity: 'AAA', inStock: true, image: require('../assets/ruby_pendant.png') },
  { id: '7', name: 'Gold Earrings', sku: 'GE-0024', category: 'gold', price: '₹18,000', unit: 'per pair', weight: '4.8g', purity: '22K', inStock: false, image: require('../assets/gold_earrings.png') },
  { id: '8', name: 'Emerald Ring', sku: 'ER-0067', category: 'gemstone', price: '₹52,000', unit: 'per piece', weight: '5.5g', purity: 'AAA', inStock: true, image: require('../assets/emerald_ring.png') },
];

const CatalogueScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [activeInput, setActiveInput] = useState(null);

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.items);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const renderProduct = ({ item, index }) => {
    if (item.empty) {
      return <View style={{ flex: 1, marginLeft: pd(10), backgroundColor: 'transparent' }} />;
    }
    
    const cartItem = cartItems.find((cItem) => cItem.id === item.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    
    return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      activeOpacity={0.85}
      style={[
        styles.productCard,
        {
          backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF',
          borderRadius: rd(20),
          marginLeft: index % 2 === 0 ? 0 : pd(10),
        },
      ]}
    >
      {/* Product Image */}
      <View style={[styles.productImage, {
        backgroundColor: isDarkMode ? '#3A3A3A' : '#F8F4EA',
        borderRadius: rd(14),
        overflow: 'hidden',
      }]}>
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        {!item.inStock && (
          <View style={[styles.outOfStockBadge, { borderRadius: rd(8) }]}>
            <Text style={{ color: '#FFF', fontSize: fs(9), fontWeight: '700' }}>OUT OF STOCK</Text>
          </View>
        )}
      </View>

      <View style={{ padding: pd(12), paddingTop: pd(10) }}>
        <Text style={[styles.productName, { color: theme.text, fontSize: fs(13) }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: fs(11), marginTop: 2 }}>
          {item.sku}
        </Text>

        <View style={[styles.productMeta, { marginTop: pd(8) }]}>
          <Text style={[styles.purity, { fontSize: fs(11), borderRadius: rd(6) }]}>
            {item.purity}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: fs(11) }}>
            {item.weight}
          </Text>
        </View>

        <View style={[styles.priceRow, { marginTop: pd(8) }]}>
          <Text style={[styles.price, { color: COLORS.primary, fontSize: fs(15) }]}>
            {item.price}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: fs(10) }}>
            {item.unit}
          </Text>
        </View>

        {quantityInCart > 0 ? (
          <View style={[styles.qtyControlContainer, { marginTop: pd(10), height: pd(34), backgroundColor: isDarkMode ? '#3A3A3A' : '#F0F0F0', borderRadius: rd(10) }]}>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.qtyControlBtn} activeOpacity={0.7}>
              <Ionicons name="remove" size={fs(16)} color={theme.text} />
            </TouchableOpacity>
            
            <Text style={{ color: theme.text, fontSize: fs(14), fontWeight: '700' }}>
              {quantityInCart}
            </Text>

            <TouchableOpacity onPress={() => dispatch(addToCart(item))} style={styles.qtyControlBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={fs(16)} color={theme.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, {
              backgroundColor: item.inStock ? COLORS.primary : '#ccc',
              borderRadius: rd(10),
              marginTop: pd(10),
              height: pd(34),
            }]}
            disabled={!item.inStock}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(addToCart(item));
            }}
          >
            <Text style={{ color: '#fff', fontSize: fs(12), fontWeight: '700' }}>
              {item.inStock ? '+ Add to Order' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1E1E1E' : COLORS.backgroundLight}
      />

      <Header 
        title="Catalogue" 
        subtitle={`${filteredProducts.length} products found`}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightElement={<CartButton />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { alignItems: 'center' }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: contentWidth }}>

          {/* ── Search Bar ── */}
          <View style={[styles.searchBar, {
            backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF',
            borderRadius: rd(16),
            borderColor: activeInput === 'search' ? COLORS.primary : 'transparent',
            borderWidth: activeInput === 'search' ? 1.5 : 1,
            marginTop: pd(18),
            marginBottom: pd(6),
            height: pd(50),
            paddingHorizontal: pd(16),
          }]}>
            <Text style={{ fontSize: fs(18), marginRight: pd(10), color: COLORS.primary }}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: theme.text, fontSize: fs(14) }]}
              placeholder="Search product or SKU..."
              placeholderTextColor={COLORS.textMuted}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setActiveInput('search')}
              onBlur={() => setActiveInput(null)}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text style={{ fontSize: fs(16), color: theme.textSecondary }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ── Category Filter Chips ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: pd(14), paddingHorizontal: pd(2) }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: selectedCategory === cat.id ? COLORS.primary : (isDarkMode ? '#2C2C2C' : '#FFFFFF'),
                    borderRadius: rd(22),
                    paddingHorizontal: pd(16),
                    height: pd(38),
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text style={{
                  color: selectedCategory === cat.id ? '#FFF' : theme.text,
                  fontSize: fs(13),
                  fontWeight: selectedCategory === cat.id ? '700' : '500',
                }}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── Product Grid ── */}
          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: fs(40) }}>🔍</Text>
              <Text style={{ color: theme.textSecondary, fontSize: fs(15), marginTop: pd(12), textAlign: 'center' }}>
                No products found{'\n'}Try a different search or category
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts.length % 2 === 1 ? [...filteredProducts, { id: 'dummy-empty', empty: true }] : filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ marginBottom: pd(14) }}
              contentContainerStyle={{ paddingBottom: pd(20) }}
            />
          )}

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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontWeight: '500',
  },
  chip: {
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  productCard: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#999',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  productName: {
    fontWeight: '700',
    lineHeight: 18,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  purity: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontWeight: '800',
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  qtyControlBtn: {
    padding: 4,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
});

export default CatalogueScreen;
 //testing