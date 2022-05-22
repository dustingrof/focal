import React, { useContext, useEffect } from 'react';
import MiniTaskCard from './MiniTaskCard';
import Board from '@asseinfo/react-kanban';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';
import emailjs from 'emailjs-com';
import { useForm } from '@mantine/form';


import {
  Text,
  Space,
  AppShell,
  Title,
  MantineProvider,
  ColorSchemeProvider,
  Grid,
  Image,
  Textarea,
  Center,
  Button,
  Card,
  Group,
  Badge,
  Box,
  TextInput
} from '@mantine/core';

import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';

export default function BoardView(props) {
  const params = useParams();
  const { board, onMoveCard, setUrlBoardId, boardInfo } = useContext(boardContext);

  const { colorScheme, setColorScheme } = useContext(colourListContext);

  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_we1l6z4',
        'template_uo04hrp',
        e.target,
        'o9qqYklc_7AmMNiC6'
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });



  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}>
        <AppShell
          padding='md'
          navbar={<LeftNavbar />}
          header={<TopHeader />}
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>

          <Grid>



            <Grid.Col span={6} offset={1}>
              <h1>The focal story</h1>
              <Text>
                A collaborative effort for the Lighthouse Labs web development program. Built in the span of a week and a half, using React on the frontend and Express/PostgreSQL on the backend.
              </Text>
              <Space h='xl' />
              <Text>
                Please enjoy this beta release while we continue to dream up new features.
              </Text>
            </Grid.Col>





            <Grid.Col span={5} offset={1}>
              <Space h='xl' />
              <Space h='xl' />


              <h1>Our team</h1>
              <Grid.Col span={3}>

                <Image
                  width={100}
                  radius={50}
                  src="https://media-exp1.licdn.com/dms/image/C5603AQG9TyKFm-53iw/profile-displayphoto-shrink_800_800/0/1646679014931?e=1658361600&v=beta&t=RwhvswjhtXKHoO_UIjWTi84w2qmp6zBFNai3HVmU8Bw"
                  alt="Random unsplash image"
                />

              </Grid.Col>


              <Space h='xl' />


              <Grid.Col span={4} justify={true}>
                <Image
                  width={100}
                  radius={50}
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEUSRGk43oeGA/profile-displayphoto-shrink_800_800/0/1652991046562?e=1658361600&v=beta&t=ORJ1H2_Qk_V8_xJe3w6ia0mfAYo4mdg8TxLaWuRrt5g"
                  alt="Random unsplash image"
                />

              </Grid.Col>

              <Space h='xl' />


              <Grid.Col span={4}>
                <Image
                  width={100}
                  radius={50}
                  src="https://media-exp1.licdn.com/dms/image/C5603AQHwuNX81FzwEQ/profile-displayphoto-shrink_400_400/0/1646859896622?e=1658361600&v=beta&t=nioiZ7kph-nU2N1P97Y7xTeZXJl9OAqUSi0esu6SMu0"
                  alt="Random unsplash image"
                />
              </Grid.Col>

            </Grid.Col>


            <Grid.Col span={4}>

              <Card shadow="sm" p="lg">
                <Group position="apart" >

                  <Box mx='auto'>
                  {/* <Box> */}
                    <h1>Get in touch</h1>

                    {/* <MailForward onClick={() => setMailForward(o => !o)} /> */}
                    {/* <Collapse in={mailForwardOpened}> */}
                    <form onSubmit={sendEmail}>
                      {/* Hidden from front, gets current username and enters it */}
                      <TextInput
                        label="Your name:"
                        placeholder='Enter name'
                        name='name'
                        type='text'
                        value={props.currentUser}
                        required
                        size="lg"
                      />
                      <Space h='md' />
                      <TextInput
                        label="Your email address:"
                        placeholder="Enter email"
                        name='email'
                        type='email'
                        required
                        size="lg"

                        minRows={1}
                      />
                      {/* <Space h='md' />
                      <TextInput
                        placeholder='..or say hi, and let us get the conversation started'
                        label="What would you like to discuss?"
                        name='subject'
                        type='text'
                        defaultValue={props.taskName}
                        required
                      /> */}
                      <Space h='md' />
                      <Textarea
                        label="Your message to us:"
                        placeholder='..or just say hello, and let us get the conversation started!'
                        name='message'
                        type='text'
                        required
                        minRows={7}
                        size="lg"

                      />
                      <Space h='md' />
                      <Button size="lg" type='submit' className='btn btn-info' value='Send Message'>
                        Submit
                      </Button>
                    </form>
                    {/* </Collapse> */}
                  </Box>










                </Group>
              </Card>






            </Grid.Col>

            <Grid.Col span={1} />


          </Grid>













        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
