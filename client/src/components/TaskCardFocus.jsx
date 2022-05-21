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
  Collapse,
  TextInput,
  Center,
  Chips,
  Chip,
  Accordion,
  Textarea,
} from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import {
  BrandGithub,
  Flag3,
  Edit,
} from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';
import Timer from './TopHeader/Timer';
import axios from "axios";
import { timerContext, useTimer } from '../providers/timerProvider';
import { useBoardList } from '../providers/boardListProvider';



export default function TaskCardFocus(props) {
  const { cardData } = props; // onFocusModalClose(cardData);

  // simple ISO due date
  let dueDate = null;
  if (cardData.due_date) {
    dueDate = cardData.due_date.slice(0, 10);
  }



  const { onFocusModalClose, onTaskDelete } = useContext(boardContext);

  // console.log('Card Data', cardData);
  const { sec, min, hrs, timerActive, setHrs, setMin, setSec, setTimerActive, reset, stop } = useContext(timerContext);

  const initialTextValue = cardData.description;

  const [opened, setOpened] = useState(false);
  const [richTextValue, onRichTextValueChange] = useState(initialTextValue);
  const [editOpened, setEditOpen] = useState(false);
  const [titleToUpdate, setTitleToUpdate] = useState(cardData.title);
  const [dateToUpdate, setDateToUpdate] = useState(dueDate);
  const [timeUpdated, setTimeUpdated] = useState(cardData.total_time_sec);


  // BUG with these turned on (to edit task/board in the card edit view) without the default status it will throw erro every refresh (trying to "save" with status = NaN)
  // const [taskStatus, setTaskStatus] = useState();
  // const [taskBoard, setTaskBoard] = useState();




  const theme = useMantineTheme();


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


  const addTimeToTask = function () {
    let returnSecs = 0;
    returnSecs += sec;
    returnSecs += Math.round(min * 60);
    returnSecs += Math.round(hrs * 60) * 60;
    const newTime = timeUpdated + returnSecs;
    setTimeUpdated(newTime);
    reset();
    stop();
  };


  // delete task
  const deleteTask = function () {

    // cardToDelete must contain board_id and card_id
    const cardToDelete = {
      board_id: cardData.board_id,
      task_id: cardData.id,
    };

    // console.log("cardToDelete:", cardToDelete);

    // // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    if (cardToDelete.task_id && cardToDelete.board_id) {
      // pass new card and make axios request (in boardProvider.js)
      onTaskDelete(cardToDelete);
    } else {
      console.log("DELETE CARD REQUEST NOT SENT");
    }

  };



  const modalClose = function () {

    // // use this when feature "edit status / edit board" is implemented
    // const cardDataToUpdate = {
    //   board_id: taskBoard,
    //   description: richTextValue,
    //   due_date: dateToUpdate,
    //   id: cardData.id,
    //   title: titleToUpdate,
    //   status: taskStatus,
    //   total_time_sec: timeUpdated
    // };

    // use this without feature "edit status / edit board"
    const cardDataToUpdate = {
      board_id: cardData.board_id,
      description: richTextValue,
      due_date: dateToUpdate,
      id: cardData.id,
      title: titleToUpdate,
      status: cardData.status,
      total_time_sec: timeUpdated
    };





    const setModalState = () => setOpened(false);
    setModalState();

    onFocusModalClose(cardDataToUpdate);
  };

  const convertTotalTimeToISO = new Date(timeUpdated * 1000).toISOString().slice(11, 19);



  const { boardList } = useBoardList();
  const boardsArray = Object.values(boardList);
  const boardChipList = boardsArray.map(board => {
    const boardId = board.id;
    const boardTitle = board.name;
    return (
      <Chip value={String(boardId)}>{boardTitle}</Chip>
    );
  });






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
        >
        <Grid>
          <Grid.Col span={6}>
            <h3>
              {titleToUpdate}
              <Edit onClick={() => setEditOpen(o => !o)} />
            </h3>
            <Collapse in={editOpened}>
              <TextInput
                variant='unstyled'
                placeholder={'Please enter a new title'}
                size='xl'
                value={titleToUpdate}
                onChange={event => setTitleToUpdate(event.currentTarget.value)}
              />
              <Button
                variant='outline'
                compact
                onClick={() => setEditOpen(o => !o)}>
                Save Changes
              </Button>
            </Collapse>

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
            <DatePicker
              placeholder={dueDate}
              value={dateToUpdate}
              // defaultValue={dateToUpdate}
              onChange={setDateToUpdate}
              label='Due Date:'
            />
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <Grid>
          <Grid.Col span={6}>
            <Button>Schedule a Meeting</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Center>Current time on task: {convertTotalTimeToISO}</Center>
            <Timer task={cardData} addTimeToTask={addTimeToTask} />
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

        {/* <Accordion>


          <Accordion.Item label="Edit board:">
            <Chips multiple={false} defaultValue={taskStatus} onChange={setTaskStatus}>
              {boardChipList}
            </Chips>

          </Accordion.Item>

          <Accordion.Item label="Edit status:">
            <Chips multiple={false} value={taskBoard} onChange={setTaskBoard}>
              <Chip value="1">Backlog</Chip>
              <Chip value="2">Doing</Chip>
              <Chip value="3">Pending</Chip>
              <Chip value="4">Complete</Chip>
            </Chips>

          </Accordion.Item>


        </Accordion> */}
        <Space h='xl' />

        <Grid>
          <Grid.Col span={12}>

            <Center>
              <Button
                color="red"
                onClick={deleteTask}
              >
                Delete
              </Button>

            </Center>
          </Grid.Col>
        </Grid>

        <Space h='xl' />
        <Text size='sm' color='grey'>
          Changes automatically saved when board is closed
        </Text>

        <Space h='xl' />

      </Modal>

      <Group position='center'>
        <Button onClick={() => setOpened(true)}>Details</Button>
      </Group>
    </>
  );
}
