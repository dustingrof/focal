import React from 'react';
import {
  Card,
  Avatar,
  Image,
  Group,
  Text,
  Badge,
  Center,
  Title,
  Space,
} from '@mantine/core';
import { useWeather } from '../providers/weatherProvider';
import { AlignJustified } from 'tabler-icons-react';

export default function WeatherAPI() {
  const { weather } = useWeather();
  return (
    <>
      <Center>
        {weather ? (
          <Card className='weather-widget'>
            <Card.Section>
              <Image
                src='https://github.com/dustingrof/focal/blob/main/client/public/images/iStock-1365081598.jpg?raw=true'
                alt='Lighthouse in a storm'
              />
            </Card.Section>
            <Space m='xs' />
            <Title order={3} align='center'>
              Current Weather
            </Title>
            <Center weight={500}>
              {' '}
              {weather.location.name}, {weather.location.region}{' '}
            </Center>
            <Group
              align='center'
              position='apart'
              style={{ marginBottom: 5, marginTop: 5 }}>
              <Avatar src={weather.current.condition.icon} alt="it's me" />
              {weather.current.condition.text}
              <Badge
                color={weather.current.temp_c > 15 ? 'red' : 'blue'}
                variant='light'>
                {weather.current.temp_c} °C
              </Badge>
            </Group>
          </Card>
        ) : (
          <div />
        )}
      </Center>
    </>
  );
}
