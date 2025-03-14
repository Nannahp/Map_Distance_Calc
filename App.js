import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { collection, addDoc, GeoPoint } from 'firebase/firestore';
import db from './firebase'
import { useCollection} from 'react-firebase-hooks/firestore'

export default function App() {
  const [markerLocation, setMarkerLocation] = useState(null)
  const [values, loading, error] = useCollection(collection(db, 'markers'))
  const data = values?.docs.map((doc) => ({...doc.data(), id:doc.id}))

  const region={
    latitude: 55.7,
    longitude: 12.6,
    latitudeDelta:0.3,
    longitudeDelta:0.3
  }

  async function handleLongPress(event){
      console.log("pressed long ")
      const { coordinate } = event.nativeEvent
      //setMarkerLocation(coordinate)
      try {
        await addDoc(collection(db, 'markers'),{
          location: new GeoPoint(coordinate.latitude, coordinate.longitude)
        })
      } catch (error) {
        console.log("error uploading marker ", error)
      }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MapView
      initalRegion={region}
      onLongPress={handleLongPress}
      style={{flex:1, width:'100%', height:'100%'}}>

        { data && data.map((marker)=>    (
        <Marker 
        key={marker.id}
        coordinate={{
          latitude:marker.location.latitude,
          longitude:marker.location.longitude
        }}
        title="Marked Location"
        description="description" /> 
        )
      )
        }

      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
