import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Group, useMantineTheme, Grid, Space, List, ThemeIcon, Center, Drawer, TextInput, Accordion, Text, Textarea } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import { CircleDashed, ClipboardCheck, Flag3 } from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';
import { boardListContext } from '../providers/boardListProvider';


export default function TaskCardFocus(props) {



  console.log('props22', props);

  // console.log("----------------------------------------------------");
  // console.log("fires");
  // console.log("----------------------------------------------------");


  const { urlBoardId, onBoardModalClose } = useContext(boardContext);
  const { onBoardDelete } = useContext(boardListContext);

  // console.log('props.props.name', props.props.name);
  // console.log('boardInfo', boardInfo);
  // console.log('boardInfo name', boardInfo['name']);
  // console.log('boardInfo descr', boardInfo['description']);


  const [opened, setOpened] = useState(false);
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  const [boardImageUrl, setBoardImageUrl] = useState();
  const theme = useMantineTheme();


  useEffect(() => {
    setBoardName(props.props.name);
    setBoardDescription(props.props.description);
    setBoardImageUrl(props.props.image);

  }, [opened]);

  // console.log('boardName', boardName);
  // console.log('boardDescription', boardDescription);

  // Image uploader
  const handleImageUpload = (file) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      fetch('https://api.imgbb.com/1/upload?key=d01ee599140b27bd510a79bbaf033cbf', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error('Upload failed')));
    });



  const boardModalClose = function () {

    const boardDataToUpdate = {
      name: boardName,
      description: boardDescription,
      id: urlBoardId,
    };

    const setModalState = () => setOpened(false);
    setModalState();

    onBoardModalClose(boardDataToUpdate);

  };


  const deleteBoard = function () {

    // cardToDelete must contain board_id
    const boardToDelete = {
      board_id: urlBoardId,
    };

    // console.log("cardToDelete:", cardToDelete);

    // // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    if (boardToDelete.board_id) {
      // pass new card and make axios request (in boardProvider.js)
      onBoardDelete(boardToDelete);
    } else {
      console.log("DELETE BOARD REQUEST NOT SENT");
    }

  };

  return (
    <>
      {/* <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        
        overlayOpacity={0.55}
        overlayBlur={3}
        size='lg'        <RichTextEditor
          controls={[
            ['bold', 'italic', 'underline'],
            ['unorderedList', 'unorderedList'],
            ['link', 'image'],
          ]}
          value={boardDescription}
          onChange={setBoardDescription}
          onImageUpload={handleImageUpload}
        />
        transition='pop'
        transitionDuration={200}
        transitionTimingFunction='ease'> */}

      <Drawer
        opened={opened}
        onClose={boardModalClose}
        padding="xl"
        size="xl"
      >

        <h2>Edit board details</h2>


        <Space h='xl' />


          <TextInput
            // variant='unstyled'
            placeholder={boardName}
            size='xl'
            value={boardName}
            onChange={event => setBoardName(event.currentTarget.value)}
          />
      <Space h='xl' />
      <Space h='xl' />


          <Textarea
            // variant='unstyled'
            placeholder={boardDescription}
            size='md'
            autosize
            minRows={2}
            maxRows={4}
            value={boardDescription}
            onChange={event => setBoardDescription(event.currentTarget.value)}
          />
      <Space h='xl' />
      <Space h='xl' />

          <Accordion>


        <Accordion.Item label="Edit image URL">
          <TextInput
            variant='unstyled'
            placeholder={boardImageUrl}
            size='md'
            value={boardImageUrl}
            onChange={event => setBoardImageUrl(event.currentTarget.value)}
          />

        </Accordion.Item>


      </Accordion>
      <Space h='xl' />

      <Text size='sm' color='grey'>
        Changes automatically saved when board is closed
      </Text>





      <Space h='xl' />
      <Space h='xl' />
      <Space h='xl' />
      <Center>
        <Button
          color="red"
          onClick={deleteBoard}
        >
          Delete Board
        </Button>

      </Center>
    </Drawer>
      {/* </Modal> */ }

  <Group position='center'>
    <Button onClick={() => setOpened(true)}>Board Card</Button>
  </Group>
    </>
  );
};


