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




                  {/* <Card.Section>
                    <h2>Get in touch</h2>
                    <Textarea
                      // onChange={(event) => setRichTitleValueChange(event.currentTarget.value)}
                      placeholder="Your email address (don't worry, we don't spam)"
                      size="md"
                      required={true}
                    />
                    <Space h='xl' />
                    <Textarea
                      // onChange={(event) => setRichTitleValueChange(event.currentTarget.value)}
                      placeholder="Your message to us"
                      size="md"
                      required={true}
                      autosize
                      minRows={12}
                    />
                    <Space h='xl' />
          

                    <Center>
                      <Button
                        color="green"
                      // onClick={newModalClose}
                      >
                        Send
                      </Button>
                    </Center>

                  </Card.Section> */}


                    <div className='container'>
                      {/* <form onSubmit={sendEmail}> */}
                      <form >
                        <div className='row pt-5 mx-auto'>
                          <div className='col-8 form-group mx-auto'>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Name'
                              name='name'
                            />
                          </div>
                          <div className='col-8 form-group pt-2 mx-auto'>
                            <input
                              type='email'
                              className='form-control'
                              placeholder='Email Address'
                              name='email'
                            />
                          </div>
                          <div className='col-8 form-group pt-2 mx-auto'>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Subject'
                              name='subject'
                            />
                          </div>
                          <div className='col-8 form-group pt-2 mx-auto'>
                            <textarea
                              className='form-control'
                              id=''
                              cols='30'
                              rows='8'
                              placeholder='Your message'
                              name='message'></textarea>
                          </div>
                          <div className='col-8 pt-3 mx-auto'>
                            <input
                              type='submit'
                              className='btn btn-info'
                              value='Send Message'></input>
                          </div>
                        </div>
                      </form>
                    </div>










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
