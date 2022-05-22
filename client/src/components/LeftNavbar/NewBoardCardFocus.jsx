import React, { useState, useContext, useEffect } from 'react';
import { SquarePlus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

import {
  Center,
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
  Textarea,
  TextInput,
  Chips,
  Chip,
  Drawer,
  Theme,
  Alert,
  Tooltip
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
  };

  // new board with save
  const newBoardSave = function () {
    setAlert(false);
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
    
    // send to backend
    if (boardToAdd.name) {
      // pass new card and make axios request (in boardProvider.js)
      onNewBoard(boardToAdd);
      // update modal prop
      const setModalState = () => setOpened(false);
      setModalState();
    } else {
      // Notification
      setAlert(true);
      console.log('NEW BOARD REQUEST NOT SENT');
    }
    
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
    <>
      {/* <Modal
        withCloseButton={false}
        closeOnEscape={true}
        closeOnClickOutside={true}
        opened={opened}
        onClose={newBoardNoSave}
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
        transitionTimingFunction='ease'> */}

      <Drawer
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        overlayOpacity={0.5}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        // title='Register'
        padding='xl'
        size='xl'>
        <h2>Create a new board</h2>
        <h4>Board name:</h4>
        <Textarea
          onChange={event => setBoardName(event.currentTarget.value)}
          placeholder='Enter text'
      
        />
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
       {alert? 
       <Alert icon={<AlertCircle size={16} />} title="Please enter a title for your board!" color="red" withCloseButton /> : null
       }
      
   

      </Drawer>

      <List.Item
        icon={


          <Tooltip
          label='Create a new board'
          closeDelay={100}
          position='right'
          withArrow arrowSize={4}
          transition="pop"
          transitionDuration={100}
          transitionTimingFunction="ease"
          >



          <SquarePlus
            size={56}
            strokeWidth={1}
            color={'#228be6'}
            onClick={() => setOpened(true)}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderStyle: 'solid',
              borderColor: 'gray',
              margin: 3,
            }}
            />
            </Tooltip>
        }></List.Item>
    </>
  );
}
