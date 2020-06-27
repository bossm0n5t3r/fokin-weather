import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons name="weather-lightning-rainy" size={100} color="black" />
        <Text style={styles.temp}>{temp}o</Text>
        <Text>{condition}</Text>
      </View>
      <View style={styles.halfContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  temp: {
    fontSize: 40,
  }
})

export default Weather;
