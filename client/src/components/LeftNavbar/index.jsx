import React, { useContext } from 'react';

import NavBarAvatarList from './NavBarAvatarList';
import NavBarAvatar from './NavBarAvatar';
import Chat from '../TopHeader/Chat';

import { Navbar, Text, Center } from '@mantine/core';
import NewBoardCardFocus from './NewBoardCardFocus';

export default function LeftNavbar() {
  // const { colorScheme, setColorScheme } = useContext(colourListContext);

  return (
    <Navbar width={{ base: 'auto' }} p='xs'>
      <Navbar.Section grow mt='md'>
        <NavBarAvatarList />
        <Center>
          <Text
            component='span'
            align='center'
            variant='gradient'
            // gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            // size={'xl'}
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: 18 }}>
            <a href='/about'>about</a>
          </Text>
        </Center>
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}
