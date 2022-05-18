import React, { } from 'react';
import NavBarAvatar from './NavBarAvatar';
import { List, Space, Center } from '@mantine/core';
import {  useBoardList } from '../providers/boardListProvider';
import { SquarePlus } from 'tabler-icons-react';
import { Link } from "react-router-dom";



// TODO Polish
// Add Button link to new board card focus edit view line 34
// If no board selected show board name, else just show avatar


export default function NavBarAvatarList() {
  
  const { boardList } = useBoardList();

  const boardsArray = Object.values(boardList);

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
      <Center target="_blank" href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} component="a" >
        <SquarePlus size={40} strokeWidth={2} color={'#228be6'} />
      </Center>
      <Space h='lg' />
      <List>{list}</List>
    </>
  );
}
