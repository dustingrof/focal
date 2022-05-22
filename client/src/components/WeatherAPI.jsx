import React from "react";
import { Card, Avatar, Image, Group, Text, Badge, Center } from '@mantine/core';
import { useWeather } from '../providers/weatherProvider';
import { AlignJustified } from "tabler-icons-react";


export default function WeatherAPI() {
  const { weather } = useWeather();
  return(
    <>
    <Center>

    {weather? 
      <Card 
      shadow="xl"
      p="xl"
      style={{ marginTop: 10, maxHeight:400, maxWidth:280}}
      >
        <Card.Section>
          <Image src="https://github.com/dustingrof/focal/blob/main/client/public/images/iStock-1365081598.jpg?raw=true" height={160} alt="Lighthouse in a storm" />
        </Card.Section>
       
          <Center  weight={400}>Current Weather  </Center>
          <Center weight={500}> { weather.location.name}, {weather.location.region} </Center>
        <Group align='center' position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
          <Avatar src={weather.current.condition.icon} alt="it's me" />
            {weather.current.condition.text}
          <Badge color={weather.current.temp_c > 15 ? "red" : "blue"} variant="light">
            {weather.current.temp_c}  °C
          </Badge>
        </Group>




       
      </Card> : <div/>}


        </Center>
    </>

  )

}
