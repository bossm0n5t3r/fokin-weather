import React, { useContext } from 'react';
import Loading from './Loading';
import Weather, { IWeatherContext, WeatherContext } from './Weather';

const App = () => {
  const context = useContext<IWeatherContext>(WeatherContext);
  const {
    isLoading
  } = context;

  return (
    isLoading ? <Loading /> : <Weather />
  );
}

export default App;
