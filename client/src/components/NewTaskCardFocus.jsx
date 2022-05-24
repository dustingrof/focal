import React, { useState, useContext } from 'react';
import {
  Center,
  Modal,
  Button,
  Group,
  useMantineTheme,
  Grid,
  Space,
  Text,
  Textarea,
  Chips,
  Chip,
  CheckboxGroup,
  Checkbox,
  Title,
  ThemeIcon
} from '@mantine/core';
import { CirclePlus } from 'tabler-icons-react';
import { DatePicker } from '@mantine/dates';
import { boardContext } from '../providers/boardProvider';
import { useBoardList } from '../providers/boardListProvider';
import {v4 as uuidv4} from 'uuid';

export default function NewTaskCardFocus(props) {
  const { onNewFocusModalClose } = useContext(boardContext);
  const { listOfUsers } = useBoardList();
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [richTitleValue, setRichTitleValueChange] = useState("Enter title here");
  const [richTextValue, setRichTextValueChange] = useState("Enter description here");
  const [dateToSave, setDateToSave] = useState(null);
  const [userValue, setUserValue] = useState([]);
  // TODO add default chip selection for task status and task board
  const [newTaskStatus, setNewTaskStatus] = useState();
  const [newTaskBoard, setNewTaskBoard] = useState();
  
  const usersToString = userValue.join(', ');
  
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
    <React.Fragment>
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
        radius='md'
        transition='pop'
        transitionDuration={200}
      >
        <h2>Create a new task</h2>
        <h4>Title: *</h4>
        <Textarea
          onChange={(event) => setRichTitleValueChange(event.currentTarget.value)}
          placeholder="Enter text"
        />
        <Space h='xs' />
        <h4>Description:</h4>
        <Textarea
          onChange={(event) => setRichTextValueChange(event.currentTarget.value)}
          placeholder="Enter text"
        />
        <Space h='xs' />
        <h4>Due date:</h4>
        <DatePicker
          placeholder={"Select date"}
          value={dateToSave}
          onChange={setDateToSave}
        />
        <Space h='xs' />
        <h4>Users:</h4>
        <CheckboxGroup onChange={setUserValue}>
          {formatUserData}
        </CheckboxGroup>
        <Space h='xs' />
        <h4>Select board: *</h4>
        <Chips multiple={false} defaultValue={newTaskBoard} onChange={setNewTaskBoard}>
          {boardChipList}
        </Chips>
        <Space h='xs' />
        <h4>Select initial status: *</h4>
        <Chips multiple={false} value={newTaskStatus} onChange={setNewTaskStatus}>
          <Chip key={-1} value="1">Backlog</Chip>
          <Chip key={-2} value="2">Doing</Chip>
          <Chip key={-3} value="3">Pending</Chip>
          <Chip key={-4} value="4">Complete</Chip>
        </Chips>
        <Space h='xs' />
        <Space h='xs' />
        <Space h='xs' />
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
              <Button color="green" onClick={newModalClose}>
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
    
     
        <Button
       variant="subtle" color="dark" 
        
       size='sm' 
       radius="xl" 
          // style={{ marginRight: 10 }}
          onClick={() => setOpened(true)} 
          leftIcon={<CirclePlus />}>
            Add a new card
          
        </Button>
     
    
     
    </React.Fragment>
  );
}
