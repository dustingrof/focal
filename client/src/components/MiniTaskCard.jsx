import React, { useContext, useState } from 'react';
import {
  Card,
  Text,
  useMantineTheme,
  ActionIcon,
  ThemeIcon,
  Grid,
  useMantineDefaultProps,
  Popover,
  Badge,
  Center,
  Space,
  Divider
} from '@mantine/core';
import { Flag3, Check } from 'tabler-icons-react';
import TaskCardFocus from './TaskCardFocus';
import {v4 as uuidv4} from 'uuid';

export default function MiniTaskCard(props) {
  const { cardData, dragging, allowRemoveCard, onCardRemove } = props;

  const [popoverOpened, setPopoverOpened] = useState(false);

  // simple ISO due date
  let dueDate = null;
  if (cardData.due_date) {
    dueDate = cardData.due_date.slice(0, 10);
  }

  // console.log("dueDate:", dueDate);

  const theme = useMantineTheme();
  // const secondaryColor = theme.colorScheme === 'dark'
  //   ? theme.colors.dark[1]
  //   : theme.colors.gray[7];

  // const linkToCardFocus = `tasks/${cardData.id}`;

  let flag;
  let dueDateBlock;

  const dueDateRender = () => {


    if (dueDate) {
      dueDateBlock = (
        <>
          <Text color="dimmed">
            Due: {dueDate}
          </Text>


        </>
      );
    }


  };




  const flagRender = () => {

    const farFlag = 2; // task due 2 days away, show black flag
    const nearFlag = 0; // task is overdue, show red flag
    const today = new Date();
    const due = dueDate + 'T12:00:00Z';
    const dueAbs = Date.parse(due) / 1000 / 60 / 60 / 24;
    const todayAbs = Date.parse(today) / 1000 / 60 / 60 / 24;
    const timeRemaining = dueAbs - todayAbs;

    const isNotComplete = (cardData.status !== 4);

    if (timeRemaining <= farFlag && timeRemaining > nearFlag && isNotComplete) {
      flag = (

        <Popover
          opened={popoverOpened}
          onClose={() => setPopoverOpened(false)}
          position="top"
          placement="center"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop-top-left"
          width="auto"
          styles={{ body: { pointerEvents: 'none' } }}
          target={
            // <Badge onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
            <ThemeIcon variant='light' onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
              <Flag3
                size={40}
                strokeWidth={2}
                color={'black'}
                enableBackground="true"
              />
            </ThemeIcon>
            // </Badge>
          }
        >
          <Center>
            Nearing the due date
          </Center>
        </Popover>
      );
    }

    if (timeRemaining <= nearFlag && isNotComplete) {
      flag = (
        <Popover
          opened={popoverOpened}
          onClose={() => setPopoverOpened(false)}
          position="top"
          placement="center"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop-top-left"
          width="auto"
          styles={{ body: { pointerEvents: 'none' } }}
          target={
            // <Badge onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
            <ThemeIcon variant='light' onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
              <Flag3
                size={40}
                strokeWidth={2}
                color={'red'}
                enableBackground="true"
              />
            </ThemeIcon>
            // </Badge>
          }
        >
          <Center>
            Task is overdue
          </Center>
        </Popover>
      );
    }

    if (!isNotComplete) {
      flag = (
        <Popover
          opened={popoverOpened}
          onClose={() => setPopoverOpened(false)}
          position="top"
          placement="center"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop-top-left"
          width="auto"
          styles={{ body: { pointerEvents: 'none' } }}
          target={
            // <Badge onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
            <ThemeIcon variant='light' onMouseEnter={() => setPopoverOpened(true)} onMouseLeave={() => setPopoverOpened(false)}>
              <Check
                size={40}
                strokeWidth={2}
                color={'green'}
                enableBackground="true"
              />
            </ThemeIcon>
            // </Badge>
          }
        >
          <Center>
            Task complete
          </Center>
        </Popover>
      );
    }


  };

  flagRender();
  dueDateRender();

  return (
    <div key={uuidv4()}
      className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''
        }`}>
      <div style={{ width: 'auto', margin: 0 }}>
        <Card p='xs' target='_blank' component='a'>
          <Card.Section>
            {/* <Grid */}
            {/* position='apart' */}
            {/* style={{ marginBottom: 5, marginTop: theme.spacing.sm }}> */}
            {/* <Grid.Col> */}

            <TaskCardFocus cardData={cardData} />

            {/* </Grid.Col> */}
            {/* </Grid> */}
          </Card.Section>

          <Space h='xs' />

          <Divider my="xs" variant="dashed"/>
          <Space h='md' />


          <Card.Section>
            <Grid columns={20}>

              <Grid.Col span={15}>
              {dueDateBlock}

              </Grid.Col>



              <Grid.Col span={2} offset={1}>
                {flag}
              </Grid.Col>



            </Grid>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
}
