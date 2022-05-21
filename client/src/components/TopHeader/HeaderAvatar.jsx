import { useContext, useEffect, useState } from 'react';
import { List, Avatar } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import HeaderProvider , { headerContext } from '../../providers/headerProvider';

// TODO if statement for text/no text dependant on view
// Polishing
// Add icon boarder
// Better icon images to check view

export default function HeaderAvatar() {
  const { currentAvatar } = useContext(headerContext);


  return (

    <Avatar
      radius='md'
      size='lg'
      src={currentAvatar}
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
