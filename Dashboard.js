import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function Dashboard({ navigation }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from('entries')
        .select('id,title');

      if (error) {
        console.log('Error fetching entry:', error);
      } else {
        setEntries(data);
        console.log(data[0].title);
      }
    }
    fetchEntries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.H2}>Entries:</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.entryItem}
            onPress={() => navigation.navigate('EntryDetail', { entryId: item.id })}
          >
            <Text style={styles.entryText}>{item.title}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.entriesContainer}
      />
      <Pressable
        onPress={() => navigation.navigate('AddEntry')}
        style={({ pressed }) => [
          styles.plusButton,
          { backgroundColor: pressed ? '#FF6347' : '#FF4500' },
        ]}
      >
        <Text style={styles.plusButtonText}> + </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  H2: {
    color: '#FF4500',
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'center',
    marginBottom: 25,
  },
  entriesContainer: {
    flexGrow: 1,
    width: '100%', // Ensure FlatList takes up full width
    paddingBottom: 80, // Add space for the button at the bottom
  },
  entryItem: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 25,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 10,
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
