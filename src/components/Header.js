import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Marketplace</Text>
      <TouchableOpacity>
        <Text style={styles.searchButton}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // To avoid status bar overlap
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    fontSize: 16,
    color: '#333',
  },
});

export default Header;