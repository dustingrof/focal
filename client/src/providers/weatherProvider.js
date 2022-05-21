import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios'


export const weatherContext = createContext();

export default function WeatherProvider(props) {
  const [weather, setWeather] = useState();

  useEffect(() => {
    let ip;
  axios.get(`https://api.ipify.org/?format=json`)
  .then((response)=>{
    console.log("respose ip", response.data.ip)
    ip = response.data.ip;
  })
  .then(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=51641ca1ab964713a31131450222105&q=${ip}&aqi=no`).then((response) => {
      console.log("weather api",response.data);
      setWeather(response.data);
      console.log("weather", weather);
    })
  })
  .catch(function (error) {
    console.error(error);
  });
  
  }, [])

  const exportedValues = { weather };

  return (
    <weatherContext.Provider value={ exportedValues }>
      { props.children }
    </weatherContext.Provider>
  )
}

export const useWeather = () => useContext(weatherContext);