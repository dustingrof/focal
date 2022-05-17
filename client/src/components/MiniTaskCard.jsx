import React, {} from 'react';
import { Card, Text, useMantineTheme, ActionIcon, Grid, Avatar } from '@mantine/core';
import { Flag3 } from 'tabler-icons-react';

export default function MiniTaskCard({ children: card, dragging, allowRemoveCard, onCardRemove }) {

  const theme = useMantineTheme();
  // const secondaryColor = theme.colorScheme === 'dark'
  //   ? theme.colors.dark[1]
  //   : theme.colors.gray[7];

  return(
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
        <div style={{ width: 'auto', margin: 'auto' }}>
      <Card p="lg" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" component="a">
      
        <Card.Section>
        <Grid position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Grid.Col span={ 10 }>
            <Text weight={500}>Mini Card Title</Text>
          </Grid.Col>
          <Grid.Col span={ 2 }>
            <ActionIcon variant="light">
              <Flag3 size={48} strokeWidth={2} color={'black'}/>
            </ActionIcon>
          </Grid.Col>
        </Grid>
        </Card.Section>
        <Card.Section>
        <Grid>
          <Grid.Col span={ 6 }>
            <Avatar src="avatar.png" alt="it's me" size="sm"/>
          </Grid.Col>
     
          <Grid.Col span={ 6 }>
            <Text size="sm">2022-05-27</Text>
          </Grid.Col>
        </Grid>
        </Card.Section>
      </Card>
    </div>
  </div>
  )
};