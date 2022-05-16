import React, { useState } from 'react';
import { Modal, Button, Group, useMantineTheme, Grid, Space, List, ThemeIcon } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { DatePicker } from '@mantine/dates';
import { CircleDashed, ClipboardCheck, Flag3 } from 'tabler-icons-react';


export default function TaskCardFocus() {

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



  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="lg"
        transition="pop"
        transitionDuration={200}
        transitionTimingFunction="ease"

      >
        <Grid>

          <Grid.Col span={6}>
            <h3>
              Board Name
            </h3>
          </Grid.Col>
          <Grid.Col span={6}>
           
            <ThemeIcon color="dark" variant="light" size={48} radius="xs">
              <ClipboardCheck size={36} />
            </ThemeIcon>
          </Grid.Col>
        </Grid>
        <Space h="xl" />
        <Space h="xl" />
        <RichTextEditor 
          controls={[
            ['bold', 'italic', 'underline'],
            ['unorderedList', 'unorderedList'],
            ['link', 'image']
          ]}        value={value} onChange={onChange} onImageUpload={handleImageUpload} />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Board Card</Button>
      </Group>
    </>
  );
};


