import React, { useState, useContext, useEffect } from 'react';
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
} from '@mantine/core';
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
import { useBoardList } from '../../providers/boardListProvider';

export default function NewTaskCardFocus(props) {
  const { onNewFocusModalClose, urlBoardId } = useContext(boardContext);
  const { cardData } = props; // onFocusModalClose(cardData);

  console.log('Card Data', cardData);

  const [opened, setOpened] = useState(false);
  const [richTitleValue, setRichTitleValueChange] = useState("Enter title here");
  const [richTextValue, setRichTextValueChange] = useState("Enter description here");
  const [dateToSave, setDateToSave] = useState(null);


  // TODO add default chip selection for task status and task board
  const [newTaskStatus, setNewTaskStatus] = useState();
  const [newTaskBoard, setNewTaskBoard] = useState();
  const theme = useMantineTheme();

  // modal close without save
  const newModalCloseNoSave = function () {

    // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    // reset states
    setRichTitleValueChange("Enter title here");
    setRichTextValueChange("Enter description here");
    setDateToSave(null);
    setNewTaskStatus();
    setNewTaskBoard();
  };

  // modal close with save
  const newModalClose = function () {

    // build new card
    const cardDataToAdd = {
      board_id: newTaskBoard, // placeholder, to update
      description: richTextValue,
      due_date: dateToSave, // start with placeholder & add date later 
      title: richTitleValue,
      status: Number(newTaskStatus),
    };

    // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    // reset states
    setRichTitleValueChange("Enter title here");
    setRichTextValueChange("Enter description here");
    setDateToSave();
    setNewTaskStatus();
    setNewTaskBoard();

    if (cardDataToAdd.board_id && cardDataToAdd.description && cardDataToAdd.title && cardDataToAdd.status) {
      // pass new card and make axios request (in boardProvider.js)
      onNewFocusModalClose(cardDataToAdd);
    } else {
      console.log("NEW CARD REQUEST NOT SENT");
    }

  };

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
        closeOnEscape={false}
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => setOpened(false)}
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
        <h2>Create a new task</h2>
        <h4>Title:</h4>
        <Textarea
          onChange={(event) => setRichTitleValueChange(event.currentTarget.value)}
          placeholder="Enter text"
        />
        <Space h='xl' />
        <h4>Description:</h4>
        <Textarea
          onChange={(event) => setRichTextValueChange(event.currentTarget.value)}
          placeholder="Enter text"
        />
        <Space h='xl' />
        <h4>Select due date:</h4>
        <DatePicker
          placeholder={"Select date"}
          value={dateToSave}
          onChange={setDateToSave}
        />
        <Space h='xl' />
        <h4>Select board:</h4>
        <Chips multiple={false} defaultValue={newTaskBoard} onChange={setNewTaskBoard}>
          {boardChipList}
        </Chips>
        <Space h='xl' />
        <h4>Select initial status:</h4>
        <Chips multiple={false} value={newTaskStatus} onChange={setNewTaskStatus}>
          <Chip value="1">Backlog</Chip>
          <Chip value="2">Doing</Chip>
          <Chip value="3">Pending</Chip>
          <Chip value="4">Complete</Chip>
        </Chips>
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Grid>
          <Grid.Col span={6}>
            <Center>
              <Button
                color="gray"
                onClick={newModalCloseNoSave}
              >
                Discard
              </Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Center>
              <Button
                color="red"
                onClick={newModalClose}
              >
                Create
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <Space h='xl' />
        <Center>
          <Text size='sm' color='grey'>
            Must click Create or Discard to exit this view
          </Text>
        </Center>
      </Modal>
      <Group position='center'>
        <Button onClick={() => setOpened(true)}>New Task</Button>
      </Group>
    </>

  );
}
