import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import Svg, { Path, G, Rect } from 'react-native-svg';
import { Store, ParkingZone } from '../types';
import { MALL_GEOJSON, ICON_MAP, INITIAL_USER_LOCATION } from '../constants';
import { COLORS } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IndoorMapProps {
  stores: Store[];
  selectedStore: Store | null;
  currentFloor: string;
  onStoreSelect: (store: Store) => void;
  isDarkMode: boolean;
  parkingZones: ParkingZone[];
}

const IndoorMap: React.FC<IndoorMapProps> = ({ 
  stores, selectedStore, currentFloor, onStoreSelect, isDarkMode
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  const isParkingFloor = currentFloor === 'P1' || currentFloor === 'P2';
  const floorStores = stores.filter(s => s.floor === currentFloor);

  const boundaryFill = isDarkMode ? '#1F1F21' : '#FFFFFF';
  const boundaryStroke = isDarkMode ? '#333' : '#E5E7EB';
  const unitFill = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  const geoJsonToPath = (coordinates: number[][][]) => {
    return coordinates.map(ring => {
      return ring.map((point, i) => 
        `${i === 0 ? 'M' : 'L'}${point[0]},${point[1]}`
      ).join(' ') + ' Z';
    }).join(' ');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        }}
      >
        <Svg width={1000} height={1000} viewBox="0 0 1000 1000">
          {MALL_GEOJSON.features.filter(f => f.properties.type === 'boundary').map((feature, i) => (
            <Path
              key={`boundary-${i}`}
              d={geoJsonToPath(feature.geometry.coordinates)}
              fill={boundaryFill}
              stroke={boundaryStroke}
              strokeWidth="20"
            />
          ))}

          {!isParkingFloor && MALL_GEOJSON.features.filter(f => f.properties.type === 'unit').map((feature, i) => (
            <Path
              key={`unit-${i}`}
              d={geoJsonToPath(feature.geometry.coordinates)}
              fill={unitFill}
              stroke="rgba(100,100,100,0.2)"
              strokeWidth="1"
            />
          ))}

          {!isParkingFloor && floorStores.map(store => {
            return (
              <G 
                key={store.id} 
                x={store.position.x} 
                y={store.position.y}
                onPress={() => onStoreSelect(store)}
              >
                <Rect x="-20" y="-20" width="40" height="40" rx="10" fill={store.color} />
                <Rect x="-10" y="-10" width="20" height="20" fill="#FFF" rx="5" opacity={0.5} />
              </G>
            );
          })}

          {currentFloor === 'Ground' && (
             <G x={INITIAL_USER_LOCATION.x} y={INITIAL_USER_LOCATION.y}>
               <Rect x="-15" y="-15" width="30" height="30" rx="15" fill={COLORS.primary} stroke="white" strokeWidth="3" />
             </G>
          )}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default IndoorMap;
