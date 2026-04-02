import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useResponsive } from '../utils/responsive';
import SkeletonLoader from './SkeletonLoader';
import { useTheme } from '../theme/ThemeContext';

const CatalogueSkeleton = () => {
  const { pd, rd } = useResponsive();
  const { isDarkMode } = useTheme();

  const renderSkeletonCard = (index) => (
    <View 
      key={index} 
      style={[
        styles.skeletonCard, 
        { 
          backgroundColor: isDarkMode ? '#2C2C2C' : '#FFFFFF', 
          borderRadius: rd(20),
          padding: 0,
          marginBottom: pd(14),
          flex: 0.48, // Match the 2-column layout width
        }
      ]}
    >
      {/* Image Area */}
      <View style={[styles.imageContainer, { height: pd(120), backgroundColor: isDarkMode ? '#3A3A3A' : '#F8F4EA', borderRadius: rd(14) }]}>
        <SkeletonLoader width="100%" height="100%" borderRadius={rd(14)} />
      </View>

      {/* Details Area */}
      <View style={{ padding: pd(12) }}>
        <SkeletonLoader width="80%" height={pd(16)} borderRadius={rd(4)} style={{ marginBottom: pd(6) }} />
        <SkeletonLoader width="50%" height={pd(14)} borderRadius={rd(4)} style={{ marginBottom: pd(12) }} />
        
        <View style={styles.metaRow}>
          <SkeletonLoader width="30%" height={pd(18)} borderRadius={rd(6)} />
          <SkeletonLoader width="30%" height={pd(14)} borderRadius={rd(4)} />
        </View>

        <SkeletonLoader width="90%" height={pd(34)} borderRadius={rd(10)} style={{ marginTop: pd(12) }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <View key={i} style={styles.row}>
           {renderSkeletonCard(`left-${i}`)}
           {renderSkeletonCard(`right-${i}`)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonCard: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CatalogueSkeleton;
