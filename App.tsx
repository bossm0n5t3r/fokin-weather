import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getLocation = async() => {
    try {
      // const response = await Location.requestPermissionsAsync();
      // console.log(response);
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      // Send to API and get weather!
      console.log(latitude, longitude);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    isLoading ? <Loading /> : null
  );
}

export default App;
