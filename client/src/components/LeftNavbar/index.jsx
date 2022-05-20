import React, { useContext } from 'react';

import NavBarAvatarList from '../NavBarAvatarList';
import NavBarAvatar from './NavBarAvatar';
import Chat from '../TopHeader/Chat';


import { Navbar } from '@mantine/core';
import NewBoardCardFocus from '../TopHeader/NewBoardCardFocus';

export default function LeftNavbar() {
  // const { colorScheme, setColorScheme } = useContext(colourListContext);

  return (
    <Navbar width={{ base: 'auto' }} p='xs'>
      <Navbar.Section grow mt='md'>
        <NavBarAvatarList />
        <NewBoardCardFocus />

      </Navbar.Section>
      {/* <Pomodoro /> */}
      {/* <Timer /> */}
      <Navbar.Section>
        {/* Footer with user */}
      </Navbar.Section>
    </Navbar>
  );
}
