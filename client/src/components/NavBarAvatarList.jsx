import React from 'react';
import NavBarAvatar from './NavBarAvatar';
import { List, Space } from '@mantine/core';

// TODO Polish
// Add add button

export default function NavBarAvatarList(props) {
  const { boards } = props;
  const boardsArray = Object.values(boards);

  const list = boardsArray.map(board => {
    return (
      <div key={board.id}>
        <NavBarAvatar
          image_url={board.image_url}
          name={board.name}
          board_id={board.id}
        />
        <Space h='lg' />
      </div>
    );
  });

  return (
    <>
      <Space h='lg' />
      <List>{list}</List>
    </>
  );
}
