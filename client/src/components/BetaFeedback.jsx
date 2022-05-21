import React, { useContext, useEffect } from 'react';
import MiniTaskCard from './MiniTaskCard';
import Board from '@asseinfo/react-kanban';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';

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
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import Login from './TopHeader/Login';
import TaskCardFocus from './TaskCardFocus';
import BoardCardFocus from './BoardCardFocus';

// import Timer from './Timer';
// import Pomodoro from './Pomodoro';
// import VideoChat from './VideoChat';
import Chat from './TopHeader/Chat';
import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';

export default function BoardView(props) {


  // const navigate = useNavigate();

  const params = useParams();
  // console.log('THESE PARAMS', params);

  const { board, onMoveCard, setUrlBoardId, boardInfo } = useContext(boardContext);



  useEffect(() => {
    setUrlBoardId(params.board_id);
  }, [setUrlBoardId, params.board_id]);

  // console.log('Board State <<<<<<<', board);
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

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
                We hope you enjoy this beta release as we continue to dream up new features.
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
              <Space h='xl' />
              <Space h='xl' />
              <h1>Get in touch</h1>


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






            </Grid.Col>

            <Grid.Col span={1} />


          </Grid>













        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
