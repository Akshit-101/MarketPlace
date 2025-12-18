import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

// Static Data Array
const MOCK_DATA = [
  {
    id: '1',
    title: 'Vintage Wooden Chair',
    price: '$75.99',
    vendor: 'Furniture Studio',
    category: 'Furniture',
    image: 'https://imgs.search.brave.com/N4NjkoSKAtjDKzPE_db5FIJlGZ_713qINuvapUWoKnY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZWRlbGl2ZXJ5Lm5l/dC9lUFI4UHlLZjg0/d1BIeDdfUlltRWFn/LzU0MjI3ZmRmLTZm/MGItNDQwYS05N2M2/LTgzYmNmOGIzMzIw/MC84Ng',
  },
  {
    id: '2',
    title: 'Handmade Ceramic Mug',
    price: '$24.50',
    vendor: 'Pottery Crafts',
    category: 'Kitchenware',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    title: 'Organic Honey Jar',
    price: '$12.00',
    vendor: 'Local Bee Farm',
    category: 'Food',
    image: 'https://imgs.search.brave.com/z046v_vrww1KBAyBXtl_sw1zf7xqHN0_-rfenDZz89M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTFjcnBsYTBpNUwu/anBn',
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listPadding: {
    paddingBottom: 20,
  },
});

export default HomeScreen;