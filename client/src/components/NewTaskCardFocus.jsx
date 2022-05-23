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
  CheckboxGroup,
  Checkbox
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
import { boardContext } from '../providers/boardProvider';
import { useBoardList } from '../providers/boardListProvider';
import {v4 as uuidv4} from 'uuid';

export default function NewTaskCardFocus(props) {
  const { onNewFocusModalClose, urlBoardId } = useContext(boardContext);
  const { cardData } = props; // onFocusModalClose(cardData);
  const { listOfUsers } = useBoardList();

  // console.log('Card Data', cardData);

  const [opened, setOpened] = useState(false);
  const [richTitleValue, setRichTitleValueChange] = useState("Enter title here");
  const [richTextValue, setRichTextValueChange] = useState("Enter description here");
  const [dateToSave, setDateToSave] = useState(null);
  const [userValue, setUserValue] = useState([]);

  const usersToString = userValue.join(', ');

  // TODO add default chip selection for task status and task board
  const [newTaskStatus, setNewTaskStatus] = useState();
  const [newTaskBoard, setNewTaskBoard] = useState();
  const theme = useMantineTheme();

  let formatUserData;
  if (listOfUsers) {
    formatUserData = listOfUsers.map(user => {
      return <Checkbox key={uuidv4()} value={user.first_name} label={user.first_name} />;
    });
  }


  // modal close - NO SAVE
  ////////////////////////////////////////////////////////////////////////////////////////////
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


  // modal close - SAVE
  ////////////////////////////////////////////////////////////////////////////////////////////
  const newModalClose = function () {

    // build new card
    const cardDataToAdd = {
      board_id: newTaskBoard, // placeholder, to update
      description: richTextValue,
      due_date: dateToSave, // start with placeholder & add date later
      title: richTitleValue,
      status: Number(newTaskStatus),
      array_of_users: usersToString,

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



  // generate board chips for new task card
  ////////////////////////////////////////////////////////////////////////////////////////////
  const { boardList } = useBoardList();
  const boardsArray = Object.values(boardList);
  const boardChipList = boardsArray.map(board => {
    const boardId = board.id;
    const boardTitle = board.name;
    return (
      <Chip key={uuidv4()} value={String(boardId)}>{boardTitle}</Chip>
    );
  });



  return (
    <React.Fragment  >
    <Modal
        withCloseButton={false}
        closeOnEscape={true}
        closeOnClickOutside={true}
        opened={opened}
        onClose={newModalCloseNoSave}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        overlayOpacity={0.5}
        overlayBlur={3}
        size='lg'
        transition='pop'
        transitionDuration={200}
      >
        <h2>Create a new task</h2>
        <h4>Title: *</h4>
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
        <h4>Select users:</h4>
        <CheckboxGroup
          // defaultValue={userArray}
          // label='Select your favorite framework/library'
          // description='This is anonymous'
          // value={userArray}
          onChange={setUserValue}
        // required
        >
          {formatUserData}
        </CheckboxGroup>
        <Space h='xl' />
        <h4>Select board: *</h4>
        <Chips multiple={false} defaultValue={newTaskBoard} onChange={setNewTaskBoard}>
          {boardChipList}
        </Chips>
        <Space h='xl' />
        <h4>Select initial status: *</h4>
        <Chips multiple={false} value={newTaskStatus} onChange={setNewTaskStatus}>
          <Chip key={-1} value="1">Backlog</Chip>
          <Chip key={-2} value="2">Doing</Chip>
          <Chip key={-3} value="3">Pending</Chip>
          <Chip key={-4} value="4">Complete</Chip>
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
                color="green"
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
            * denotes manadatory field
          </Text>
        </Center>
      </Modal>
      <Group position='center'>
        <Button onClick={() => setOpened(true)}>New Task</Button>
      </Group>
    </React.Fragment>

  );
}
