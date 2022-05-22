import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';
import WeatherAPI from './WeatherAPI';

import {
  Space,
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  Grid,
  Table,
  Avatar,
  AvatarsGroup,
} from '@mantine/core';

import TopHeader from './TopHeader';
import HomeTaskCardFocus from './HomeTaskCardFocus';
import LeftNavbar from './LeftNavbar';
import { headerContext } from '../providers/headerProvider';

export default function HomeView() {
  const { currentUserId, setCurrentUserId } = useContext(headerContext);
  const { user, setUser } = useContext(headerContext);
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const [usersListOfTasks, setUsersListOfTasks] = useState();

  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    axios
      .get(`/users/${currentUserId}/tasks`, { currentUserId })
      .then(results => {
        // console.log('results.data', results.data);
        setUsersListOfTasks(Object.values(results.data));
      })
      .catch(error => {
        console.log(`Board info: Request failed with error ${error}`);
      });
  }, []);

  let rowsOfTasks;
  if (usersListOfTasks) {
    console.log('usersListOfTasks', usersListOfTasks);
    const decideToFilter = function (data) {
      if (data.users.includes(user)) {
        return true;
      }
      return false;
    };
    const result = usersListOfTasks.filter(decideToFilter);
    console.log('result', result);
    rowsOfTasks = result.map(task => {
      console.log('task.users', task.users);
      let taskStatusName;
      if (task.status === 1) {
        taskStatusName = 'Backlog';
      }
      if (task.status === 2) {
        taskStatusName = 'Doing';
      }
      if (task.status === 3) {
        taskStatusName = 'Pending';
      }
      if (task.status === 4) {
        taskStatusName = 'Complete';
      }
      const taskDueText = task.due_date
        ? new Date(task.due_date).toISOString().slice(0, 10)
        : '';
      const cardData = {
        id: task.id,
        board_id: task.board_id,
        status: task.status,
        title: task.title,
        due_date: task.due_date,
        array_of_users: task.users,
        description: task.description,
        total_time_sec: task.total_time_sec,
      };
      console.log('task.users', task.total_time_sec);
      console.log('cardData', cardData);
      return (
        <tr>
          <td className='task-title'>
            <HomeTaskCardFocus title={task.title} cardData={cardData} />
          </td>
          <td className='task-status'>{taskStatusName}</td>
          <td className='task-due_date'>{taskDueText}</td>
          <td className='task-board_name'>{task.board_name}</td>
          <td className='task-users'>
            <AvatarsGroup limit={3}>
              {task.users.map(u => {
                let avatar;
                switch (u) {
                  case 'Dustin':
                    avatar =
                      'https://media-exp1.licdn.com/dms/image/C5603AQG9TyKFm-53iw/profile-displayphoto-shrink_800_800/0/1646679014931?e=1658361600&v=beta&t=RwhvswjhtXKHoO_UIjWTi84w2qmp6zBFNai3HVmU8Bw';
                    break;
                  case 'Nicole':
                    avatar =
                      'https://media-exp1.licdn.com/dms/image/C5603AQEUSRGk43oeGA/profile-displayphoto-shrink_800_800/0/1652991046562?e=1658361600&v=beta&t=ORJ1H2_Qk_V8_xJe3w6ia0mfAYo4mdg8TxLaWuRrt5g';
                    break;
                  case 'Iaan':
                    avatar =
                      'https://media-exp1.licdn.com/dms/image/C5603AQHwuNX81FzwEQ/profile-displayphoto-shrink_400_400/0/1646859896622?e=1658361600&v=beta&t=nioiZ7kph-nU2N1P97Y7xTeZXJl9OAqUSi0esu6SMu0';
                    break;
                  default:
                    avatar =
                      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2zIMQkX0ve8QO5B5Hk8TC8&ust=1653112270774000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMDktJ-x7fcCFQAAAAAdAAAAABAD';
                }
                return <Avatar src='avatar.png' src={avatar} />;
              })}
            </AvatarsGroup>
          </td>
          <td
            className='task-board_name'
            dangerouslySetInnerHTML={{
              __html: task.description,
            }}></td>
        </tr>
      );
    });
  }

  console.log('rowsOfTasks', rowsOfTasks);

  // const rows = elements.map(element => (
  //   <tr key={element.name}>
  //     <td>{element.position}</td>
  //     <td>{element.name}</td>
  //     <td>{element.symbol}</td>
  //     <td>{element.mass}</td>
  //   </tr>
  // ));

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
          // footer={  <WeatherAPI />}
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>
          <Grid grow gutter='lg'>
            <Grid.Col span={7}>
              <Table
                horizontalSpacing='xl'
                data-sorting='true'
                data-filtering='false'
                className='footable'
                verticalSpacing='xl'
                fontSize='lg'
                highlightOnHover>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th data-hide='phone, tablet'>Status</th>
                    <th data-hide='phone, tablet'>Due Date</th>
                    <th data-hide='phone, tablet' data-breakpoints='all'>
                      Board
                    </th>
                    <th data-hide='phone, tablet' data-breakpoints='all'>
                      Assigned To
                    </th>
                    <th data-hide='phone, tablet' data-breakpoints='all'>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>{rowsOfTasks}</tbody>
              </Table>
            </Grid.Col>
            <Grid.Col span={4}>
              <WeatherAPI />
            </Grid.Col>
          </Grid>
          <Space h='xl' />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
