import React from 'react';
import { Link } from 'react-router-dom';
import NavBarAvatar from './NavBarAvatar';
import { List, Space, Center, Tooltip } from '@mantine/core';
import { useBoardList } from '../../providers/boardListProvider';
import { SquarePlus } from 'tabler-icons-react';
import NewBoardCardFocus from './NewBoardCardFocus';
import {v4 as uuidv4} from 'uuid';

// TODO Polish
// Add Button link to new board card focus edit view line 34
// If no board selected show board name, else just show avatar

export default function NavBarAvatarList() {
  const { boardList } = useBoardList();

  const boardsArray = Object.values(boardList);

  const list = boardsArray.map(board => {
    return (
    
      <NavBarAvatar
      key={uuidv4()}
      image_url={board.image_url}
      name={board.name} //TODO dynamically show this line
      board_id={board.id}
      />
      
     
    );
  });

  return (
    <React.Fragment key={uuidv4()}>
      
       <List  key={uuidv4()}>

        <NewBoardCardFocus />

        {list}
      </List>

    </React.Fragment>
  );
}

// {/* <Link to={'#'}>
//   <List.Item
//     icon={
//       <SquarePlus
//         size={56}
//         strokeWidth={1}
//         color={'#228be6'}
//         style={{
//           borderWidth: 1,
//           borderRadius: 10,
//           borderStyle: 'solid',
//           borderColor: 'gray',
//           margin: 3,
//         }}
//       />
//     }>
//     {/* {props.name} */}
//   </List.Item>
// </Link>; */}
