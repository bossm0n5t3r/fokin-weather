import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather, { CONDITION } from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "718553c22b382b8afd28a6464c63deb3"

const App = () => {
  const [location, setLocation] = useState<Location.LocationData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [temp, setTemp] = useState<number>(0);
  const [condition, setCondition] = useState<CONDITION>(CONDITION.Clear);

  const getWeather = async(latitude : number, longitude : number) => {
    const { data: { main: { temp }, weather } } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
    setIsLoading(false);
    setTemp(temp);
    setCondition(weather[0].main);
  }

  const getLocation = async(location: Location.LocationData) => {
    try {
      const { coords: { latitude, longitude } } = location;
      await getWeather(latitude, longitude);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getLocation(location);
    })();
  }, []);

  return (
    isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
  );
}

export default App;
