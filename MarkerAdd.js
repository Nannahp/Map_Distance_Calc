import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, GeoPoint } from 'firebase/firestore';
import { uploadImageAsync } from './firebase'; // This function will upload the image
import MapView, { Marker } from 'react-native-maps';

export const MarkerAdd = ({ handleLongPress }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveMarker = async (coordinate) => {
    if (image) {
      try {
        const imageUrl = await uploadImageAsync(image); // Upload image to Firebase Storage
        await addDoc(collection(db, 'markers'), {
          location: new GeoPoint(coordinate.latitude, coordinate.longitude),
          imageUrl: imageUrl,
        });
      } catch (error) {
        console.log("Error saving marker: ", error);
      }
    }
  };

  return (
    <>
      <TouchableOpacity onPress={pickImage}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      <MapView
        onLongPress={async (event) => {
          const { coordinate } = event.nativeEvent;
          handleLongPress(coordinate);
          await saveMarker(coordinate);
        }}
      />
    </>
  );
};
