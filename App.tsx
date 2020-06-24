import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "718553c22b382b8afd28a6464c63deb3"

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [temp, setTemp] = useState<number>(0);
  const [condition, setCondition] = useState<string>('');

  const getWeather = async(latitude : number, longitude : number) => {
    const { data: {main: {temp}, weather} } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
    console.log(weather[0].main);
    setIsLoading(false);
    setTemp(temp);
    // TODO condition does not pass to Weather.tsx
    setCondition(weather[0].main);
  }

  const getLocation = async() => {
    try {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      await getWeather(latitude, longitude);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
  );
}

export default App;
