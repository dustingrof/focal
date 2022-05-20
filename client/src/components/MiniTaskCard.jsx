import React, { useContext } from 'react';
import {
  Card,
  Text,
  useMantineTheme,
  ActionIcon,
  Grid,
  useMantineDefaultProps,
} from '@mantine/core';
import { Flag3 } from 'tabler-icons-react';
import TaskCardFocus from './TaskCardFocus';

export default function MiniTaskCard(props) {
  const { cardData, dragging, allowRemoveCard, onCardRemove } = props;


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
                <ActionIcon variant='light'>
                  <Flag3 size={48} strokeWidth={2} color={'black'} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Card.Section>

          <Card.Section>
            <Grid>
              <Grid.Col span={6}>
                <TaskCardFocus cardData={cardData} />

                {/* <Avatar src="avatar.png" alt="it's me" size="sm"/> */}
              </Grid.Col>

              <Grid.Col span={6}>
              <Text>
                  {dueDate ? "Due date:" : null}
                </Text>
                <Text>
                  {dueDate ? dueDate : null}
                </Text>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
}
