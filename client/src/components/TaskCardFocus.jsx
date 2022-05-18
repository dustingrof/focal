import React, { useState, useContext } from 'react';
import {
  Modal,
  Button,
  Group,
  useMantineTheme,
  Grid,
  Space,
  List,
  ThemeIcon,
  Text,
  Input,
  ActionIcon,
  Collapse,
 
} from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import { CircleDashed, BrandGithub, Flag3,  Adjustments, } from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';


export default function TaskCardFocus(props) {
  const { onFocusModalClose } = useContext(boardContext);
  const { cardData } = props;      // onFocusModalClose(cardData);

  // console.log('Card Data', cardData);
  const initialTextValue = cardData.description;

  const [opened, setOpened] = useState(false);
  const [richTextValue, onRichTextValueChange] = useState(initialTextValue);
  const theme = useMantineTheme();

  // console.log('props:', props);

  // calculate days remaining on task
  // console.log('Date(cardData.due_date):', Date(cardData.due_date));
  const today = new Date();
  // console.log('Date(today.toISOString()):', Date(today.toISOString()));

  // Image uploader
  const handleImageUpload = file =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      fetch(
        'https://api.imgbb.com/1/upload?key=d01ee599140b27bd510a79bbaf033cbf',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then(response => response.json())
        .then(result => resolve(result.data.url))
        .catch(() => reject(new Error('Upload failed')));
    });


  // console.log("richTextValue during initialize", richTextValue);

  const modalClose = function () {

    // console.log("cardData:", cardData);

    const cardDataToUpdate = {
      board_id: cardData.board_id,
      description: richTextValue,
      due_date: cardData.due_date,
      id: cardData.id,
      title: cardData.title,
      status: cardData.status,
    }
   

    // console.log("richTextValue inside closeModal before state change", richTextValue);
    const setModalState = (() => setOpened(false));
    setModalState();


    // console.log("richTextValue inside closeModal after state change", richTextValue);
    onFocusModalClose(cardDataToUpdate);

  };



  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={modalClose}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size='lg'
        transition='pop'
        transitionDuration={200}
        transitionTimingFunction='ease'>
        <Grid>
          <Grid.Col span={6}>


            <h3>{cardData.title}</h3>

            <List
              spacing='xs'
              size='sm'
              center
              icon={
                <ThemeIcon color='teal' size={24} radius='xl'>
                  <BrandGithub size={16} />
                </ThemeIcon>
              }>
              <List.Item>Moss</List.Item>
              <List.Item>Tanner</List.Item>
              <List.Item>Rolf</List.Item>
              <List.Item>Major</List.Item>
              <List.Item>Nicole</List.Item>
            </List>
          </Grid.Col>
          <Grid.Col span={6}>
            Days remaining
            <ThemeIcon color='dark' variant='light' size={24} radius='xs'>
              <Flag3 size={16} />
            </ThemeIcon>
            <DatePicker placeholder='Pick date' label='Event date' required />
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <Grid>
          <Grid.Col span={6}>
            <Button>Schedule a Meeting</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button>Track time</Button>
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <RichTextEditor
          controls={[
            ['bold', 'italic', 'underline'],
            ['unorderedList', 'unorderedList'],
            ['link', 'image'],
          ]}
          value={richTextValue}
          onChange={onRichTextValueChange}
          onImageUpload={handleImageUpload}
        />
        <Space h='xl' />

        <Grid>
          <Grid.Col span={4}>
            <Button>Duplicate Task</Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button>Delete Task</Button>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button>BUMP</Button>
          </Grid.Col>
        </Grid>
        <Space h='xl' />

        <Text size='sm' color='grey'>
          Press Esc to go back - changes will be automatically saved.
        </Text>
      </Modal>

      <Group position='center'>
        <Button onClick={() => setOpened(true)}>Details</Button>
      </Group>
    </>
  );
}



          //   {/* <ActionIcon
          //   variant='outline'
          // color={'blue'}
          // title='Open Chat'
          // onClick={() => setOpened(o => !o)}>
          //   <Adjustments />
          //   </ActionIcon> </h3> */}
            

          //   {/* <Collapse in={opened}>
          //     {/* content... */}
          //     <Input placeholder="Enter new task name" />
          //   </Collapse> */}