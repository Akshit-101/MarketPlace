import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Inside ProductCard.js
const ProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Changed source to item.image */}
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="cover" // Ensures image fills the area nicely
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.vendor}>by {item.vendor}</Text>
        
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  price: {
    fontSize: 16,
    color: '#2e7d32', // Greenish color like the reference
    fontWeight: '600',
    marginTop: 4,
  },
  vendor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
});

export default ProductCard;