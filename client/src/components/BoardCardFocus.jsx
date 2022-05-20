import React, { useState, useContext } from 'react';
import { Modal, Button, Group, useMantineTheme, Grid, Space, List, ThemeIcon, Center, Drawer } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import { CircleDashed, ClipboardCheck, Flag3 } from 'tabler-icons-react';
import { boardContext } from '../providers/boardProvider';
import { boardListContext } from '../providers/boardListProvider';


export default function TaskCardFocus() {
  const { urlBoardId } = useContext(boardContext);
  const { onBoardDelete } = useContext(boardListContext);

  const initialValue = '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
  const [opened, setOpened] = useState(false);
  const [value, onChange] = useState(initialValue);
  const theme = useMantineTheme();

  

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
        size='lg'
        transition='pop'
        transitionDuration={200}
        transitionTimingFunction='ease'> */}

<Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        <Grid>
          <Grid.Col span={6}>
            <h3>Board Name</h3>
          </Grid.Col>
          <Grid.Col span={6}>
            <ThemeIcon color='dark' variant='light' size={48} radius='xs'>
              <ClipboardCheck size={36} />
            </ThemeIcon>
          </Grid.Col>
        </Grid>
        <Space h='xl' />
        <Space h='xl' />
        <RichTextEditor
          controls={[
            ['bold', 'italic', 'underline'],
            ['unorderedList', 'unorderedList'],
            ['link', 'image'],
          ]}
          value={value}
          onChange={onChange}
          onImageUpload={handleImageUpload}
        />
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
      {/* </Modal> */}

      <Group position='center'>
        <Button onClick={() => setOpened(true)}>Board Card</Button>
      </Group>
    </>
  );
};


