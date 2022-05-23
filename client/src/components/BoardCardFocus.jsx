import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Group,
  useMantineTheme,
  Space,
  ThemeIcon,
  Center,
  Drawer,
  TextInput,
  Accordion,
  Text,
  Textarea,
  Title,
  Badge
} from '@mantine/core';

import {
 
  Route,

} from 'react-router-dom';
import { Edit, EditCircle, Link } from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';
import { boardListContext } from '../providers/boardListProvider';
import HomeView from './HomeView';

export default function TaskCardFocus(props) {

  const { urlBoardId, onBoardModalClose } = useContext(boardContext);
  const { onBoardDelete } = useContext(boardListContext);



  const [opened, setOpened] = useState(false);
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  const [boardImageUrl, setBoardImageUrl] = useState();
  const theme = useMantineTheme();

  // console.log('props.props', props.props);

  useEffect(() => {
    setBoardName(props.props.name);
    setBoardDescription(props.props.description);
    setBoardImageUrl(props.props.image_url);
  }, [opened]);


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

  const boardModalClose = function () {
    const boardDataToUpdate = {
      name: boardName,
      description: boardDescription,
      id: urlBoardId,
      image_url: boardImageUrl,
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

    // // update modal prop
    const setModalState = () => setOpened(false);
    setModalState();

    if (boardToDelete.board_id) {
      // pass new card and make axios request (in boardProvider.js)
      onBoardDelete(boardToDelete);
    } else {
      console.log('DELETE BOARD REQUEST NOT SENT');
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
        padding='xl'
        size='xl'
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        overlayOpacity={0.5}
        overlayBlur={3}>
        <h3>Edit board name:</h3>

        {/* <Space h='md' /> */}

        <TextInput
          // variant='unstyled'
          placeholder={boardName}
          size='xl'
          value={boardName}
          onChange={event => setBoardName(event.currentTarget.value)}
        />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />

        <h3>Edit board description:</h3>

        <Textarea
          // variant='unstyled'
          placeholder={boardDescription}
          size='md'
          autosize
          minRows={6}
          maxRows={6}
          value={boardDescription}
          onChange={event => setBoardDescription(event.currentTarget.value)}
        />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />

        <Accordion>
          <Accordion.Item label='Edit image URL'>
            <TextInput
              // variant='unstyled'
              placeholder={boardImageUrl}
              size='md'
              value={boardImageUrl}
              onChange={event => setBoardImageUrl(event.currentTarget.value)}
            />
          </Accordion.Item>
        </Accordion>
        <Space h='xl' />
        {/* <Space h='xl' /> */}
        {/* <Space h='xl' /> */}

        <Center>
          <Text size='md' color='grey'>
            Close window to automatically save changes
          </Text>
        </Center>

        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Center>
          <Button href='/'  component="a"
        color='red' onClick={deleteBoard}>
            Delete Board
          </Button>
        </Center>
      </Drawer>




      {/* </Modal> */}
      <Button 

variant="subtle" color="dark" 
        
        size='xl' 
        radius="xl" 
        onClick={() => setOpened(true)} 
        leftIcon={<EditCircle/>} >
        {props.children}
      </Button>


      {/* <NewTaskCardFocus /> */}
      <Group position='left'>
        {/* <Button
          onClick={() => setOpened(true)}
          variant='outline'
          rightIcon={<Edit size={25} />}
          size='xs'
          style={{ fontSize: 20, marginLeft: 10, fontWeight: 700 }}></Button> */}
      </Group>
    </>
  );
}
