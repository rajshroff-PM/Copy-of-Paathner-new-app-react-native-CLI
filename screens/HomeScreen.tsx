import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import IndoorMap from '../components/Map';
import StoreListSheet from '../components/StoreList';
import { MALL_STORES, PARKING_ZONES } from '../constants';
import { Store } from '../types';
import { COLORS } from '../theme';
import { Search, Menu, Mic } from 'lucide-react-native';

const HomeScreen: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState('Ground');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header Overlay */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Menu color={isDarkMode ? "#FFF" : "#000"} size={24} />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Search color="#888" size={20} />
            <Text style={styles.searchText}>Search stores...</Text>
            <Mic color="#888" size={20} />
          </View>
        </View>
      </SafeAreaView>

      {/* Map */}
      <IndoorMap 
        stores={MALL_STORES}
        selectedStore={selectedStore}
        currentFloor={currentFloor}
        onStoreSelect={setSelectedStore}
        isDarkMode={isDarkMode}
        parkingZones={PARKING_ZONES}
      />

      {/* Floor Selector */}
      <View style={styles.floorSelector}>
        {["Ground", "1st", "2nd"].map(floor => (
          <TouchableOpacity 
            key={floor} 
            style={[styles.floorBtn, currentFloor.includes(floor) && styles.floorBtnActive]}
            onPress={() => setCurrentFloor(floor === "Ground" ? "Ground" : `${floor} Floor`)}
          >
            <Text style={[styles.floorText, currentFloor.includes(floor) && styles.floorTextActive]}>
              {floor.charAt(0)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Sheet */}
      <StoreListSheet 
        stores={MALL_STORES.filter(s => s.floor === currentFloor)} 
        onStoreSelect={setSelectedStore}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    paddingHorizontal: 16, paddingTop: 10
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: {
    width: 44, height: 44, borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4
  },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)', height: 44, borderRadius: 12,
    paddingHorizontal: 12, justifyContent: 'space-between'
  },
  searchText: { color: '#888', flex: 1, marginLeft: 8 },
  floorSelector: {
    position: 'absolute', right: 16, top: 120, 
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 4,
    zIndex: 10
  },
  floorBtn: {
    width: 36, height: 36, justifyContent: 'center', alignItems: 'center',
    borderRadius: 8, marginBottom: 4
  },
  floorBtnActive: { backgroundColor: COLORS.primary },
  floorText: { fontWeight: 'bold', color: '#555' },
  floorTextActive: { color: '#FFF' },
});

export default HomeScreen;
