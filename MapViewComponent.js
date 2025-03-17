import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export const MapViewComponent = ({ region, markers, onLongPress, currentLocation }) => {
  return (
    <MapView
      region={region}
      style={{ flex: 1 }}
      onLongPress={onLongPress}
    >
      {markers && markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.location.latitude,
            longitude: marker.location.longitude,
          }}
          title="Marker"
          description="Description"
          onPress={() => setSelectedMarker(marker)} // Set selected marker for journal entry
        
        />
      ))}

      {/* Display user's current location */}
      {currentLocation && (
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          description="This is your current location"
          pinColor="blue"
        />
      )}
    </MapView>
  );
};
