import React from 'react';
import { Link } from 'react-router-dom';
import NavBarAvatar from './NavBarAvatar';
import { List, Space, Center } from '@mantine/core';
import { useBoardList } from '../../providers/boardListProvider';
import { SquarePlus } from 'tabler-icons-react';

// TODO Polish
// Add Button link to new board card focus edit view line 34
// If no board selected show board name, else just show avatar

export default function NavBarAvatarList() {
  const { boardList } = useBoardList();

  const boardsArray = Object.values(boardList);

  const list = boardsArray.map(board => {
    return (
      // <div key={board.id}>
      <NavBarAvatar
        key={board.image_url}
        image_url={board.image_url}
        // name={board.name} //TODO dynamically show this line
        board_id={board.id}
      />
      // <Space h='lg' />
      // </div>
    );
  });

  return (
    <>
      {/* <Center
        target='_blank'
        href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
        component='a'>
      </Center> */}
      {/* <Space h='lg' /> */}
      <Link to={'#'}>
        <List.Item
          icon={
            <SquarePlus
              size={56}
              strokeWidth={1}
              color={'#228be6'}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'solid',
                borderColor: 'gray',
                margin: 3,
              }}
            />
            // <Avatar
            //   radius='md'
            //   size='lg'
            //   alt={props.name}
            //   src={props.image_url}
            // style={{
            //   borderWidth: 1,
            //   borderRadius: 10,
            //   borderStyle: 'solid',
            //   borderColor: 'gray',
            //   margin: 3,
            // }}
            // />
          }>
          {/* {props.name} */}
        </List.Item>
      </Link>
      <List>{list}</List>
    </>
  );
}
