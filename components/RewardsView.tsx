import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Wifi } from 'lucide-react-native';
import { COLORS } from '../theme';

const MOCK_CARDS = [
  { id: '1', store: 'Starbucks', points: 1250, color: '#006241' },
  { id: '2', store: 'Nike', points: 850, color: '#D21404' },
];

const RewardsView = () => {
  const renderCard = ({ item }: { item: any }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.storeName}>{item.store}</Text>
        <Wifi color="#FFF" size={24} style={{ transform: [{ rotate: '90deg' }]}} />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.points}>{item.points}</Text>
        <Text style={styles.pointsLabel}>POINTS</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Wallet</Text>
      <FlatList
        data={MOCK_CARDS}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', margin: 20 },
  list: { padding: 16 },
  card: {
    height: 200, borderRadius: 20, padding: 24, marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  storeName: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  cardFooter: {},
  points: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
  pointsLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2 },
});

export default RewardsView;
