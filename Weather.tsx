import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Button, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import axios from 'axios';

enum CONDITION {
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
  Tornado = 'Tornado',
  Clear = 'Clear',
  Clouds = 'Clouds'
}

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "Thunderstorm in the house",
    subtitle: "Actually, outside of the house"
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "Drizzle",
    subtitle: "Is like rain, but gay 🏳️‍🌈"
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "Raining like a MF",
    subtitle: "For more info look outside"
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "Cold as balls",
    subtitle: "Do you want to build a snowman? Fuck no."
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "",
    subtitle: ""
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Mist!",
    subtitle: "It's like you have no glasses on."
  },
  Smoke: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Smoke",
    subtitle: "Just don't go outside."
  },
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Haze",
    subtitle: "Just don't go outside."
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Dusty",
    subtitle: "Thanks a lot China 🖕🏻"
  },
  Fog: {
    iconName: "weather-fog",
    gradient: ["#FF8235", "#30E8BF"],
    title: "Fog",
    subtitle: "I tried to grab fog, but I mist..."
  },
  Tornado: {
    iconName: "weather-tornado",
    gradient: ["#FF8235", "#30E8BF"],
    title: "Tornado",
    subtitle: "WARNING! TORNADO!"
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#B2FEFA", "#0ED2F7"],
    title: "Sunny as fuck",
    subtitle: "Go get your ass burnt"
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "Clouds",
    subtitle: "I know, fucking boring"
  }
}

const API_KEY = "718553c22b382b8afd28a6464c63deb3";

const Weather = () => {
  const [location, setLocation] = useState<Location.LocationData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [temp, setTemp] = useState<number>(0);
  const [condition, setCondition] = useState<CONDITION>(CONDITION.Clear);
  const [revision, setRevision] = useState<number>(0);

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

  const syncWeather = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    getLocation(location);
  }

  useEffect(() => {
    syncWeather();
  }, [revision]);

  return (
    <LinearGradient
        colors={weatherOptions[condition].gradient}
        style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <Button
          title="Refresh"
          onPress={() => setRevision(revision + 1)}
        ></Button>
        <MaterialCommunityIcons
          name={weatherOptions[condition].iconName}
          size={100}
          color="white"
        />
        <Text style={styles.temp}>{temp}˚</Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  temp: {
    fontSize: 40,
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  }
})

export interface IWeatherContext {
  isLoading: boolean
}

const initialWeatherContext = {
  isLoading: false
}

export default Weather;
export const WeatherContext = React.createContext<IWeatherContext>(initialWeatherContext);
