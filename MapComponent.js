import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { supabase } from './supabase';
import { useNavigation } from '@react-navigation/native';

const MapComponent = ({ route }) => {
  const navigation = useNavigation();
  const { latitude, longtitude } = route.params || {}; // Received coordinates (if any)

  const [currentLocation, setCurrentLocation] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null); // State to hold selected marker info

  const [region, setRegion] = useState({
    latitude: latitude || 55.7,
    longitude: longtitude || 12.6,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  });

  // Fetch user's current location
  useEffect(() => {
    let locationSubscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission Denied', 'Allow location access to use this feature');
        return;
      }
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (location) => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCurrentLocation(newLocation);

          // If no specific location was passed, focus on user's location
          if (!latitude || !longtitude) {
            setRegion((prev) => ({
              ...prev,
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
            }));
          }
        }
      );
    })();

    return () => {
      if (locationSubscription) locationSubscription.remove();
    };
  }, []);

  // Fetch all locations from Supabase
  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase.from('entries').select('id, title, latitude, longtitude, image_url');

      if (error) {
        console.error('Error fetching entries: ', error);
      } else {
        setEntries(data);
      }
      setLoading(false);
    }

    fetchEntries();
  }, []);

  // Handle marker press
  const handleMarkerPress = (entry) => {
    setSelectedMarker(entry); // Set the selected marker's details
  };

  return (
    <View style={styles.container}>
      <Text>Map Component</Text>
      <MapView region={region} style={styles.map}>
        {/* Markers for all entries */}
        {entries.map((entry) => (
          <Marker
            key={entry.id}
            coordinate={{ latitude: entry.latitude, longitude: entry.longtitude }}
            title={entry.title}
            onPress={() => handleMarkerPress(entry)} // Set selected marker on press
          />
        ))}

        {/* User's current location */}
        {currentLocation && (
          <Marker coordinate={currentLocation} title="You are here" pinColor="blue" />
        )}
      </MapView>

      {/* Display selected marker's details */}
      {selectedMarker && (
        <View style={styles.selectedMarkerContainer}>
          <Text style={styles.selectedMarkerTitle}>{selectedMarker.title}</Text>
          {selectedMarker.image_url && (
            <Image source={{ uri: selectedMarker.image_url }} style={styles.image} />
          )}
          <Button
            title="View Details"
            onPress={() =>
              navigation.navigate('EntryDetail', {
                entryId: selectedMarker.id,
              })
            }
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  selectedMarkerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  selectedMarkerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default MapComponent;
