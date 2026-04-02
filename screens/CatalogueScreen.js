import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '../theme/colors';
import { useResponsive } from '../utils/responsive';
import Header from '../components/Header';
import CartButton from '../components/CartButton';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { fetchCatalogue } from '../redux/slices/catalogueSlice';
import { BASE_URL } from '../api/apiClient';
import CatalogueSkeleton from '../components/CatalogueSkeleton';

// ─── Category chips ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'stock', label: '📦 In Stock' },
  { id: 'sold', label: '✅ Sold' },
];

// ─── Normalise API response fields to the card's expected shape ───────────────
const normalise = (item) => {
  // Construct image URL using the backend's streaming endpoint
  const getImageUrl = () => {
    if (item.img && item.img.length > 0) {
      return `${BASE_URL}/img?path=${encodeURIComponent(item.img[0])}`;
    }
    return item.image_url ?? item.imageUrl ?? null;
  };

  return {
    id: String(item.id ?? item._id ?? item.item_code ?? Math.random()),
    name: item.item_name ?? item.remarks ?? item.item_code ?? 'Unnamed Product',
    sku: item.item_code ?? item.sku ?? '—',
    category: (item.status ?? item.category ?? item.item_type ?? '').toLowerCase(),
    price:
      item.sale_amount != null
        ? `₹${Number(item.sale_amount).toLocaleString('en-IN')}`
        : item.price ?? '—',
    unit: item.unit ?? item.uom ?? 'per piece',
    weight: item.net_wt
      ? `${item.net_wt}g`
      : item.weight
      ? `${item.weight}g`
      : '—',
    purity: item.purity ?? item.quality ?? '—',
    inStock: item.status === 'stock' || item.in_stock === true || true,
    imageUrl: getImageUrl(),
  };
};

const CatalogueScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const { fs, pd, rd, contentWidth } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [activeInput, setActiveInput] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { products, loading, error } = useSelector((state) => state.catalogue);

  // ── Fetch catalogue from API on mount ───────────────────────────────────────
  useEffect(() => {
    dispatch(fetchCatalogue());
  }, [dispatch]);

  const normalisedProducts = products.map(normalise);

  const filteredProducts = normalisedProducts.filter((p) => {
    const matchCategory =
      selectedCategory === 'all' || p.category.includes(selectedCategory);
    const matchSearch =
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ── Product card renderer ────────────────────────────────────────────────────
  const renderProduct = ({ item, index }) => {
    if (item.empty) {
      return (
        <View
          style={{ flex: 1, marginLeft: pd(10), backgroundColor: 'transparent' }}
        />
      );
    }

    const cartItem = cartItems.find((c) => c.id === item.id);
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
        {/* Image */}
        <View
          style={[
            styles.productImage,
            {
              backgroundColor: isDarkMode ? '#3A3A3A' : '#F8F4EA',
              borderRadius: rd(14),
              overflow: 'hidden',
            },
          ]}
        >
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="diamond-outline" size={fs(36)} color={COLORS.primary} />
            </View>
          )}
          {!item.inStock && (
            <View style={[styles.outOfStockBadge, { borderRadius: rd(8) }]}>
              <Text style={{ color: '#FFF', fontSize: fs(9), fontWeight: '700' }}>
                OUT OF STOCK
              </Text>
            </View>
          )}
        </View>

        {/* Details */}
        <View style={{ padding: pd(12), paddingTop: pd(10) }}>
          <Text
            style={[styles.productName, { color: theme.text, fontSize: fs(13) }]}
            numberOfLines={2}
          >
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
            <View
              style={[
                styles.qtyControlContainer,
                {
                  marginTop: pd(10),
                  height: pd(34),
                  backgroundColor: isDarkMode ? '#3A3A3A' : '#F0F0F0',
                  borderRadius: rd(10),
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}
                style={styles.qtyControlBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={fs(16)} color={theme.text} />
              </TouchableOpacity>
              <Text style={{ color: theme.text, fontSize: fs(14), fontWeight: '700' }}>
                {quantityInCart}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(addToCart(item))}
                style={styles.qtyControlBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={fs(16)} color={theme.text} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.addBtn,
                {
                  backgroundColor: item.inStock ? COLORS.primary : '#ccc',
                  borderRadius: rd(10),
                  marginTop: pd(10),
                  height: pd(34),
                },
              ]}
              disabled={!item.inStock}
              activeOpacity={0.8}
              onPress={() => dispatch(addToCart(item))}
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

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1E1E1E' : COLORS.backgroundLight}
      />

      <Header
        title="Catalogue"
        subtitle={loading ? 'Loading…' : `${filteredProducts.length} products found`}
        showBack={false}
        rightElement={<CartButton />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { alignItems: 'center' }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: contentWidth }}>

          {/* ── Search Bar ── */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF',
                borderRadius: rd(16),
                borderColor: activeInput === 'search' ? COLORS.primary : 'transparent',
                borderWidth: activeInput === 'search' ? 1.5 : 1,
                marginTop: pd(18),
                marginBottom: pd(6),
                height: pd(50),
                paddingHorizontal: pd(16),
              },
            ]}
          >
            <Text style={{ fontSize: fs(18), marginRight: pd(10), color: COLORS.primary }}>
              🔍
            </Text>
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

          {/* ── Category Chips ── */}
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
                    backgroundColor:
                      selectedCategory === cat.id
                        ? COLORS.primary
                        : isDarkMode
                        ? '#2C2C2C'
                        : '#FFFFFF',
                    borderRadius: rd(22),
                    paddingHorizontal: pd(16),
                    height: pd(38),
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: selectedCategory === cat.id ? '#FFF' : theme.text,
                    fontSize: fs(13),
                    fontWeight: selectedCategory === cat.id ? '700' : '500',
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── Loading ── */}
          {loading && <CatalogueSkeleton />}

          {/* ── Error ── */}
          {!loading && error && (
            <View style={styles.centeredState}>
              <Ionicons
                name="cloud-offline-outline"
                size={fs(48)}
                color={theme.textSecondary}
              />
              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: fs(15),
                  marginTop: pd(12),
                  textAlign: 'center',
                }}
              >
                {typeof error === 'string'
                  ? error
                  : error?.message ?? 'Failed to load catalogue'}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(fetchCatalogue())}
                style={[
                  styles.retryBtn,
                  { backgroundColor: COLORS.primary, borderRadius: rd(12), marginTop: pd(16) },
                ]}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: fs(14) }}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Product Grid ── */}
          {!loading && !error && (
            filteredProducts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={{ fontSize: fs(40) }}>🔍</Text>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: fs(15),
                    marginTop: pd(12),
                    textAlign: 'center',
                  }}
                >
                  No products found{'\n'}Try a different search or category
                </Text>
              </View>
            ) : (
              <FlatList
                data={
                  filteredProducts.length % 2 === 1
                    ? [...filteredProducts, { id: 'dummy-empty', empty: true }]
                    : filteredProducts
                }
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={{ marginBottom: pd(14) }}
                contentContainerStyle={{ paddingBottom: pd(20) }}
              />
            )
          )}

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
  price: { fontWeight: '800' },
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
  centeredState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  retryBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
});

export default CatalogueScreen;