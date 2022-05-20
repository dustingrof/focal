import { useContext } from 'react';
import { List, Avatar } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
// import { boardContext } from '../../providers/boardProvider';

// TODO if statement for text/no text dependant on view
// Polishing
// Add icon boarder
// Better icon images to check view

export default function HeaderAvatar() {
  // const { userAvatar } = useContext(boardContext);

  const userAvatar = localStorage.getItem('avatar');

  return (

    <Avatar
      radius='md'
      size='lg'
      src={userAvatar}
      style={{
        borderWidth: 1,
        borderRadius: 50,
        borderStyle: 'solid',
        borderColor: 'gray',
        margin: 3,
      }}
    />

  );
}
