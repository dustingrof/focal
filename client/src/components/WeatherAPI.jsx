import React from "react";
import { Card, Avatar, Image } from '@mantine/core';
import { useWeather } from '../providers/weatherProvider';


export default function WeatherAPI() {
  const { weather } = useWeather();
  return(
    <>
    {weather? 
      <Card 
      style={{ marginTop: 10, maxHeight:200, maxWidth:200 }}
      >
        <Card.Section>
          <Image src="" height={160} alt="Lighthouse in a storm" />
        </Card.Section>
        { weather.location.name} 
        {weather.location.region}
        <Avatar src={weather.current.condition.icon} alt="it's me" />
        {weather.current.condition.text}
        {weather.current.temp_c}
      </Card> : <div/>}
    </>
  )

}
