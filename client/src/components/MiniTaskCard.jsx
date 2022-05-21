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
} from '@mantine/core';
import { Flag3, Check } from 'tabler-icons-react';
import TaskCardFocus from './TaskCardFocus';

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
          <Grid.Col span={6}>

            <Text color="dimmed">
              Due:
            </Text>
            <Text color="dimmed">
              {dueDate}
            </Text >
          </Grid.Col>


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
                enableBackground={true}
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
                enableBackground={true}
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
                enableBackground={true}
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
    <div
      className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''
        }`}>
      <div style={{ width: 'auto', margin: 'auto' }}>
        <Card p='lg' target='_blank' component='a'>
          <Card.Section>
            <Grid
              position='apart'
              style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Grid.Col span={10}>
                <Text size='lg' weight={500}>
                  {cardData.title}
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>



                {flag}
                {/* <Flag3 size={48} strokeWidth={2} color={'black'} /> */}




              </Grid.Col>
            </Grid>
          </Card.Section>

          <Card.Section>
            <Grid>
              <Grid.Col span={6}>
                <TaskCardFocus cardData={cardData} />

                {/* <Avatar src="avatar.png" alt="it's me" size="sm"/> */}
              </Grid.Col>

              {dueDateBlock}
            </Grid>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
}
