import React, { useState, useContext, useEffect } from 'react';
import { Plus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// key={uuidv4()}
import {
  Center,
  Modal,
  Button,
  Group,
  useMantineTheme,
  Grid,
  Space,
  List,
  Textarea,
  Drawer,
  Alert,
  Tooltip,
} from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import {
  CircleDashed,
  BrandGithub,
  Flag3,
  Adjustments,
  Edit,
} from 'tabler-icons-react';
import { boardContext } from '../../providers/boardProvider';
import { boardListContext } from '../../providers/boardListProvider';

export default function NewBoardCardFocus(props) {
  const { onNewFocusModalClose, urlBoardId } = useContext(boardContext);

  const theme = useMantineTheme();

  const { onNewBoard } = useContext(boardListContext);

  const [opened, setOpened] = useState(false);
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  const [boardImageUrl, setBoardImageUrl] = useState();
  const [alert, setAlert] = useState(false);
  // TODO add default chip selection for task status and task board
  // const [newTaskStatus, setNewTaskStatus] = useState();
  // const [newTaskBoard, setNewTaskBoard] = useState();

  // modal close without save
  const newBoardNoSave = function () {
    // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    // reset states
    setBoardName();
    setBoardDescription();
    setBoardImageUrl();
    setAlert(false);
  };

  // new board with save
  const newBoardSave = function () {
    // build new board
    const boardToAdd = {
      name: boardName,
      description: boardDescription,
      image_url: boardImageUrl,
    };

    if (!boardToAdd.image_url) {
      boardToAdd.image_url = null;
    }
    // console.log("boardToAdd:", boardToAdd);

    // reset states
    setBoardName();
    setBoardDescription();
    setBoardImageUrl();
    setAlert(false);

    // send to backend
    if (boardToAdd.name) {
      // pass new card and make axios request (in boardProvider.js)
      onNewBoard(boardToAdd);
      // update modal prop
      const setModalState = () => setOpened(false);
      setModalState();
      setAlert(false);
    } else {
      // Notification
      setAlert(true);
      console.log('NEW BOARD REQUEST NOT SENT');
    }
  };

  const titleHandler = e => {
    setBoardName(e.currentTarget.value);
    setAlert(false);
  };
  // const { boardList } = useBoardList();
  // const boardsArray = Object.values(boardList);
  // const boardChipList = boardsArray.map(board => {
  //   const boardId = board.id;
  //   const boardTitle = board.name;
  //   return (
  //     <Chip value={String(boardId)}>{boardTitle}</Chip>
  //   );
  // });

  return (
    <React.Fragment>
      <Drawer
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        withclosebutton='false'
        overlayOpacity={0.5}
        overlayBlur={3}
        opened={opened}
        onClose={newBoardNoSave}
        // title='Register'
        padding='xl'
        size='xl'>
        <h2>Create a new board</h2>
        <h4>Board name:</h4>

        <Textarea onChange={titleHandler} placeholder='Enter text' />
        {alert ? (
          <>
            <Space h='xl' />
            <Alert
              icon={<AlertCircle size={16} />}
              title='Please enter a title for your board!'
              color='red'
              variant='filled'
            />
          </>
        ) : null}
        <Space h='xl' />
        <h4>Description:</h4>
        <Textarea
          onChange={event => setBoardDescription(event.currentTarget.value)}
          placeholder='Enter text'
        />
        <Space h='xl' />
        <h4>Image URL:</h4>
        <Textarea
          onChange={event => setBoardImageUrl(event.currentTarget.value)}
          placeholder='Enter text'
        />
        <Space h='xl' />

        <Space h='xl' />
        <Space h='xl' />
        <Grid>
          <Grid.Col span={6}>
            <Center>
              <Button color='gray' onClick={newBoardNoSave}>
                Discard
              </Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Center>
              <Button color='green' onClick={newBoardSave}>
                Create
              </Button>
            </Center>
          </Grid.Col>
        </Grid>

        <Space h='xl' />
        <Space h='xl' />
      </Drawer>

      <List.Item
        icon={
          <Tooltip
            label='Create a new board'
            key={uuidv4()}
            closeDelay={100}
            position='right'
            withArrow
            arrowSize={4}
            transition='pop'
            transitionDuration={100}
            transitionTimingFunction='ease'>
            {/* <ActionIcon size='xl' variant='transparent'>
              <Adjustments />
            </ActionIcon> */}
            <Plus
              className='nav-buttons'
              size={55}
              strokeWidth={2}
              onClick={() => setOpened(true)}
              style={{
                margin: 3,
              }}
            />
          </Tooltip>
        }></List.Item>
    </React.Fragment>
  );
}
