import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const SkeletonLoader = ({ width, height, borderRadius = 8, style }) => {
  const { isDarkMode } = useTheme();
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = React.useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerValue]);

  const onLayout = (event) => {
    const { width: w } = event.nativeEvent.layout;
    setLayoutWidth(w);
  };

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-layoutWidth || 100, layoutWidth || 100],
  });

  const backgroundColor = isDarkMode ? '#333' : '#E1E1E1';
  const shimmerColor = isDarkMode ? '#444' : '#F2F2F2';

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={[styles.shimmer, { backgroundColor: shimmerColor }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  shimmer: {
    flex: 1,
    width: '50%',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    opacity: 0.5,
  },
});

export default SkeletonLoader;
