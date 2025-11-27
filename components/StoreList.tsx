import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Store } from '../types';
import { ICON_MAP } from '../constants';
import { COLORS, SHADOWS } from '../theme';
import { MapPin, Clock } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface StoreListProps {
  stores: Store[];
  onStoreSelect: (store: Store) => void;
  isDarkMode: boolean;
}

const StoreListSheet: React.FC<StoreListProps> = ({ stores, onStoreSelect, isDarkMode }) => {
  const renderItem = ({ item }: { item: Store }) => {
    const Icon = ICON_MAP[item.iconName] || ICON_MAP['default'];
    
    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: isDarkMode ? COLORS.gray900 : 'white', borderColor: isDarkMode ? '#333' : '#eee' }]}
        onPress={() => onStoreSelect(item)}
      >
        <View style={styles.row}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Icon color="#FFF" size={24} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.metaRow}>
              <MapPin size={12} color={COLORS.primary} />
              <Text style={styles.metaText}>{item.floor}</Text>
              <Clock size={12} color="#10B981" style={{ marginLeft: 8 }} />
              <Text style={styles.metaText}>Open</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.backgroundDark : '#fff' }]}>
      <View style={styles.handle} />
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Stores</Text>
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.45,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    ...SHADOWS.medium,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default StoreListSheet;
