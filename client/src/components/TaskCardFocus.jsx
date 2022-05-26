import React, { useState, useContext, forwardRef, useEffect } from 'react';
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
  Avatar,
  Accordion,
  MultiSelect,
  SelectItem,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Title,
  Container,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import {
  BrandGithub,
  Flag3,
  Edit,
  MailForward,
  CircleCheck,
  EditCircle,
} from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';
import Timer from './Timer';
import EmailForm from './EmailForm';
import VideoChat from './VideoChat';
import axios from 'axios';
import { timerContext, useTimer } from '../providers/timerProvider';
import { useBoardList } from '../providers/boardListProvider';
import { useHeader } from '../providers/headerProvider';
import { v4 as uuidv4 } from 'uuid';

export default function TaskCardFocus(props) {
  const { cardData } = props; // onFocusModalClose(cardData);

  const userArray = cardData.array_of_users.split(', ');

  // simple ISO due date
  let dueDate = null;
  if (cardData.due_date) {
    dueDate = cardData.due_date.slice(0, 10);
  }
  const initialTextValue = cardData.description;

  const { onFocusModalClose, onTaskDelete } = useContext(boardContext);
  const { listOfUsers } = useBoardList();
  const { user } = useHeader();
  const { sec, min, hrs, reset, stop } = useContext(timerContext);
  const [opened, setOpened] = useState(false);
  const [richTextValue, onRichTextValueChange] = useState(initialTextValue);
  const [editOpened, setEditOpen] = useState(false);
  const [titleToUpdate, setTitleToUpdate] = useState(cardData.title);
  const [dateToUpdate, setDateToUpdate] = useState(dueDate);
  const [timeUpdated, setTimeUpdated] = useState(cardData.total_time_sec);
  const [userValue, setUserValue] = useState(userArray);
  const [mailForwardOpened, setMailForward] = useState(false);

  const usersToString = userValue.join(', ');

  let formatUserData;
  if (listOfUsers) {
    formatUserData = listOfUsers.map(user => {
      return (
        <Checkbox
          value={user.first_name}
          label={user.first_name}
          key={uuidv4()}
        />
      );
    });
  }

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
    // showNotification({title: 'Message', message: "Time added to task.", icon={<Check size={18} />}, color="teal", title="Teal notification"});
    showNotification({
      id: 'load-data',
      color: 'teal',
      title: 'Your total task time has been updated!',
      // message: '!',
      icon: <CheckIcon />,
      autoClose: 3000,
    });
  };

  // delete task
  const deleteTask = function () {
    // cardToDelete must contain board_id and card_id
    const cardToDelete = {
      board_id: cardData.board_id,
      task_id: cardData.id,
    };

    // // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    if (cardToDelete.task_id && cardToDelete.board_id) {
      // pass new card and make axios request (in boardProvider.js)
      onTaskDelete(cardToDelete);
    } else {
      console.log('DELETE CARD REQUEST NOT SENT');
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
      total_time_sec: timeUpdated,
      array_of_users: usersToString,
    };

    const setModalState = () => setOpened(false);
    setModalState();

    onFocusModalClose(cardDataToUpdate);
  };

  const convertTotalTimeToISO = new Date(timeUpdated * 1000)
    .toISOString()
    .slice(11, 19);

  const { boardList } = useBoardList();
  const boardsArray = Object.values(boardList);
  const boardChipList = boardsArray.map(board => {
    const boardId = board.id;
    const boardTitle = board.name;
    return (
      <Chip key={uuidv4()} value={String(boardId)}>
        {boardTitle}
      </Chip>
    );
  });

  return (
    <React.Fragment>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={modalClose}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        overlayOpacity={0.5}
        overlayBlur={3}
        size='lg'
        padding='xl'
        radius='md'
        transition='pop'
        transitionDuration={200}>
        <Grid columns={30} style={{ display: 'flex' }}>
          {/* Column to hold Task Name */}
          <Grid.Col span={24}>
            <Title order={3} style={{ marginTop: 10 }}>
              {titleToUpdate}
              <ThemeIcon
                color='dark'
                variant='light'
                size={24}
                radius='xs'
                style={{ marginLeft: 10 }}>
                <Flag3 size={16} />
              </ThemeIcon>
            </Title>
          </Grid.Col>
          <Grid.Col
            span={2}
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Edit onClick={() => setEditOpen(o => !o)} />
          </Grid.Col>
          <Grid.Col
            span={2}
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <MailForward onClick={() => setMailForward(o => !o)} />
          </Grid.Col>
          <Grid.Col
            span={2}
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <VideoChat />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col>
            {/* Shows the form when a user clicks edit */}
            <Collapse in={editOpened}>
              <TextInput
                placeholder={'Please enter a new title'}
                label={'Edit your task name below:'}
                size='md'
                value={titleToUpdate}
                onChange={event => setTitleToUpdate(event.currentTarget.value)}
                rightSection={
                  <CircleCheck
                    onClick={() => setEditOpen(o => !o)}
                    alt='Save Changes'>
                    Save Changes
                  </CircleCheck>
                }
              />
              <Space h='xl' />
            </Collapse>
            <Collapse in={mailForwardOpened}>
              <EmailForm taskName={titleToUpdate} currentUser={user} />
            </Collapse>
          </Grid.Col>
          <Grid.Col span={6}>
            <CheckboxGroup
              defaultValue={userArray}
              label='Select team members to assign:'
              // description='This is anonymous'
              // value={userArray}
              onChange={setUserValue}
              // required
            >
              {formatUserData}
            </CheckboxGroup>
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePicker
              placeholder={dueDate}
              value={dateToUpdate}
              // defaultValue={dateToUpdate}
              onChange={setDateToUpdate}
              label='Due Date:'
            />
            <Space h='xl' />
            <Text size='lg'>
              <span style={{ fontWeight: 700 }}>Total task time:</span>{' '}
              {convertTotalTimeToISO}
            </Text>
            <Space h='xl' />
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <Grid>
          <Grid.Col>
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
              <Button color='red' onClick={deleteTask}>
                Delete
              </Button>
            </Center>
          </Grid.Col>
        </Grid>

        <Space h='xl' />
        <Center>
          <Text size='sm' color='grey'>
            Changes automatically saved when board is closed.
          </Text>
        </Center>
        <Space h='xl' />
      </Modal>

      {/* <Group position='center'>
        <Button onClick={() => setOpened(true)} variant='outline'>
          Details
        </Button>
      </Group> */}

      {/* <Container style={{ marginLeft: 10, display: "flex", flexDirection: "row" }}> */}

      <List key={uuidv4()}>
        <List.Item
          key={uuidv4()}
          icon={
            <Button
              color='dark'
              variant='subtle'
              size='xs'
              style={{ marginRight: 0, marginLeft: 0 }}
              onClick={() => setOpened(true)}>
              <EditCircle size={24} />
            </Button>
          }>
          {titleToUpdate}
        </List.Item>
      </List>
      {/* </Container> */}
    </React.Fragment>
  );
}
