import { StatusBar } from 'expo-status-bar';
import { FlatList, TextInput, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'; 
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { supabase } from './supabase'

export default function HomePage({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission Denied: Allow location access to use this feature');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveEntry = async () => {
    if (!title || !currentLocation) {
      alert("No title or location");
      return;
    }
  
    let imageUrl = null;
    if (image) {
      try {
        const fileName = `image_${Date.now()}.jpg`;
        const contentType = 'image/jpeg';
  
        // Fetch the image and convert it to an ArrayBuffer
        const response = await fetch(image);
        const arrayBuffer = await response.arrayBuffer();
  
        // Upload to the 'images' bucket
        const { data, error } = await supabase.storage
          .from('images')
          .upload(fileName, arrayBuffer, {
            contentType,
            upsert: false,
          });
  
        if (error) {
          console.error('Error uploading image:', error);
          return;
        }
  
        // Get the public URL of the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
  
        imageUrl = publicUrl;
        console.log('Image uploaded:', imageUrl);
      } catch (error) {
        console.error('Error fetching image or uploading:', error);
      }
    }
  
    const locationData = JSON.stringify({
      type: "Point",
      coordinates: [currentLocation.longitude, currentLocation.latitude],
    });
  
    try {
        const { error } = await supabase.from('entries').insert([
          {
            title,
            description,
            latitude: currentLocation.latitude,  // Use latitude column
            longtitude: currentLocation.longitude, // Use longitude column
            image_url: imageUrl,
            created_at: new Date(),
          },
        ]);
  
      if (error) {
        console.error("Error saving entry:", error);
      } else {
        alert("Entry saved!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description (optional)" value={description} onChangeText={setDescription} multiline />

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📷 Take Picture</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <Pressable style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>💾 Save Entry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE', // Light pink background
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
    fontFamily: 'Poppins', // Playful font
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 14,
    width: '100%',
    borderRadius: 12,
    borderColor: '#FF4500',
    fontSize: 18,
    fontFamily: 'Poppins',
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
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
    height: 300, // Fixed height for the list container
    marginTop: 30,
  },
  listItem: {
    backgroundColor: '#FFB6C1',
    padding: 5,
    width: '30%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 15,
    marginRight: 12,
    marginLeft: 2,
    shadowColor: '#FFB6C1',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  listItemText: {
    color: '#FF6347',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
