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
  Accordion,
  Avatar,
  TextInput,
} from '@mantine/core';

import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';

export default function BoardView(props) {
  const params = useParams();
  const { board, onMoveCard, setUrlBoardId, boardInfo } =
    useContext(boardContext);

  const { colorScheme, setColorScheme } = useContext(colourListContext);

  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_we1l6z4',
        'template_x25n3h7',
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
          <Grid gutter='xl' className='about-grid'>
            <Grid.Col span={6}>
              <Title>The back story</Title>
              <Card shadow='xl' className='about-contact-card'>
                <Text>
                  A collaborative effort for the Lighthouse Labs web development
                  program, built in the span of a week and a half
                </Text>
                <Space h='xs' />
                <Text>
                  Please enjoy this beta release while we continue to dream up
                  new features.
                </Text>
                <Space h='xs' />
                <Grid columns={50}>
                  <Grid.Col span={10}>
                    <Text style={{ fontWeight: 'bold' }}>Stack:</Text>
                  </Grid.Col>
                  <Grid.Col span={40}>
                    <Text>
                      Javascript, React, Express, PostgreSQL, Mantine, SASS
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>

              <Space h='xs' />
            </Grid.Col>
            <Grid.Col span={6} className='redirect-url'>
              <Text
                component='span'
                className='focal-logo'
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                // size={'xl'}
                weight={700}
                style={{
                  fontFamily: 'Greycliff CF, sans-serif',
                  fontSize: 32,
                }}>
                <a href='/'>focal-project.dev</a>
              </Text>
            </Grid.Col>
          </Grid>
          <Grid gutter='xl' className='about-grid'>
            <Grid.Col span={6}>
              <Title order={1} className='about-page-title'>
                Our team
              </Title>
              <Accordion className='about-accordion'>
                <Accordion.Item
                  label={
                    <Grid>
                      <Grid.Col span={3}>
                        <Image
                          width={75}
                          radius={50}
                          src='https://media-exp1.licdn.com/dms/image/C5603AQG9TyKFm-53iw/profile-displayphoto-shrink_800_800/0/1646679014931?e=1658361600&v=beta&t=RwhvswjhtXKHoO_UIjWTi84w2qmp6zBFNai3HVmU8Bw'
                          alt='Random unsplash image'
                          component='a'
                          href='https://www.linkedin.com/in/dustingrof/'
                          target='_blank'
                        />
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Space h='xl' />
                        <Text>Dustin Grof</Text>
                      </Grid.Col>
                    </Grid>
                  }>
                  <div>
                    <Text size='sm' weight={400}>
                      I have over 10 years experience in front-end design. Most
                      recently completing the Lighthouse Labs Full Stack
                      Development Diploma. Prior to graduating, my main focus
                      has been WordPress websites, hosting, HTML, CSS, PHP and
                      Javascript.
                    </Text>
                    <Space h='xs' />

                    <Text>
                      <a href='https://www.linkedin.com/in/dustingrof/'>
                        Connect on LinkedIn
                      </a>
                    </Text>
                  </div>
                </Accordion.Item>
                <Space h='xl' />

                <Accordion.Item
                  label={
                    <Grid>
                      <Grid.Col span={3}>
                        <Image
                          width={75}
                          radius={50}
                          src='https://media-exp1.licdn.com/dms/image/C5603AQEUSRGk43oeGA/profile-displayphoto-shrink_800_800/0/1652991046562?e=1658361600&v=beta&t=ORJ1H2_Qk_V8_xJe3w6ia0mfAYo4mdg8TxLaWuRrt5g'
                          alt='Random unsplash image'
                          component='a'
                          href='    https://www.linkedin.com/in/nicole-maclean-501aa6b6/'
                          target='_blank'
                        />
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Space h='lg' />
                        <Text>Nicole MacLean</Text>{' '}
                      </Grid.Col>
                    </Grid>
                  }>
                  <div>
                    <Text size='sm' weight={400}>
                      I used to make whisky. Now I make websites.
                    </Text>
                    <Space h='xs' />

                    <Text>
                      <a href='https://www.linkedin.com/in/nicole-maclean-501aa6b6/'>
                        Connect on LinkedIn
                      </a>
                    </Text>
                  </div>
                </Accordion.Item>
                <Space h='xl' />

                <Accordion.Item
                  label={
                    <Grid>
                      <Grid.Col span={3}>
                        <Image
                          width={75}
                          radius={50}
                          src='https://media-exp1.licdn.com/dms/image/C5603AQHwuNX81FzwEQ/profile-displayphoto-shrink_400_400/0/1646859896622?e=1658361600&v=beta&t=nioiZ7kph-nU2N1P97Y7xTeZXJl9OAqUSi0esu6SMu0'
                          alt='Random unsplash image'
                          component='a'
                          href='https://www.linkedin.com/in/iaanjohnston/'
                          target='_blank'
                        />
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Space h='lg' />
                        <Text>Iaan Johnston</Text>{' '}
                      </Grid.Col>
                    </Grid>
                  }>
                  <div>
                    <Text size='sm' weight={400}>
                      Full stack web developer, pivoting from 9 years of
                      mechanical engineering. Experience leading teams, and
                      taking projects from concept to completion.
                    </Text>
                    <Space h='xs' />
                    <Text>
                      <a href='https://www.linkedin.com/in/iaanjohnston/'>
                        Connect on LinkedIn
                      </a>
                    </Text>
                  </div>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>

            <Grid.Col span={6}>
              <Title order={1}>Get in touch</Title>
              <Card shadow='xl' className='about-contact-card'>
                <Group position='apart' className='about-contact-form'>
                  <Box>
                    {/* <Box> */}

                    {/* <MailForward onClick={() => setMailForward(o => !o)} /> */}
                    {/* <Collapse in={mailForwardOpened}> */}
                    <form onSubmit={sendEmail}>
                      {/* Hidden from front, gets current username and enters it */}
                      <TextInput
                        label='Your name:'
                        placeholder='Enter name'
                        name='name'
                        type='text'
                        value={props.currentUser}
                        required
                        size='md'
                      />
                      <Space h='md' />
                      <TextInput
                        label='Your email address:'
                        placeholder='Enter email'
                        name='email'
                        type='email'
                        required
                        size='md'
                        minrows={1}
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
                        label='Your message to us:'
                        placeholder='..or just say hello, and let us get the conversation started!'
                        name='message'
                        type='text'
                        required
                        minRows={7}
                        size='md'
                      />
                      <Space h='md' />
                      <Button
                        size='md'
                        type='submit'
                        className='btn btn-info'
                        value='Send Message'>
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
