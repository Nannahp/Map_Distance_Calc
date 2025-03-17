import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.H1}>Travel Journal</Text>
      <Pressable
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Open</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  H1: {
    color: '#FF4500',
    fontWeight: 'bold',
    fontSize: 36,
    alignSelf: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#FF4500',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
});
