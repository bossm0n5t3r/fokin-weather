import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const CONDITION = {
  Thunderstorm : 'Thunderstorm',
  Drizzle : 'Drizzle',
  Rain : 'Rain',
  Snow : 'Snow',
  Atmosphere : 'Atmosphere',
  Mist : 'Mist',
  Smoke : 'Smoke',
  Haze : 'Haze',
  Dust : 'Dust',
  Fog : 'Fog',
  Sand : 'Sand',
  Ash : 'Ash',
  Squall : 'Squall',
  Tornado : 'Tornado',
  Clear : 'Clear',
  Clouds : 'Clouds'
}

const Weather = (
  temp : any,
  condition : string
) => {
  return (
    <View style={styles.container}>
      <Text>{temp.temp}</Text>
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
