import React, { useContext } from 'react';

import NavBarAvatarList from './NavBarAvatarList';
import NavBarAvatar from './NavBarAvatar';
import Chat from '../TopHeader/Chat';

import { Navbar } from '@mantine/core';
import NewBoardCardFocus from './NewBoardCardFocus';

export default function LeftNavbar() {
  // const { colorScheme, setColorScheme } = useContext(colourListContext);

  return (
    <Navbar width={{ base: 'auto' }} p='xs'>
      <Navbar.Section grow mt='md'>
        <NavBarAvatarList />
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}
