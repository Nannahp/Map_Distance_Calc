import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// LocationService to track user location
export const LocationService = ({ setCurrentLocation, setRegion }) => {
  useEffect(() => {
    let locationSubscription;
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission Denied', 'Allow location access to use this feature');
        return;
      }
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentLocation({ latitude, longitude });
          setRegion((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        }
      );
    };

    getLocation();

    return () => {
      if (locationSubscription) locationSubscription.remove();
    };
  }, [setCurrentLocation, setRegion]);

  return null; // This is a background service, no UI needed
};
