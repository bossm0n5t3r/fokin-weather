import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export enum CONDITION {
  Thunderstorm = 'Thunderstorm',
  Drizzle = 'Drizzle',
  Rain = 'Rain',
  Snow = 'Snow',
  Atmosphere = 'Atmosphere',
  Mist = 'Mist',
  Smoke = 'Smoke',
  Haze = 'Haze',
  Dust = 'Dust',
  Fog = 'Fog',
  Sand = 'Sand',
  Ash = 'Ash',
  Squall = 'Squall',
  Tornado = 'Tornado',
  Clear = 'Clear',
  Clouds = 'Clouds'
}

interface IWeather {
  temp: number,
  condition: CONDITION
}

const Weather = ({ temp, condition } : IWeather) => {
  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <Text>{condition}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Weather;
