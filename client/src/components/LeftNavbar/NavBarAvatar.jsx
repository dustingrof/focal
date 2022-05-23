import { List, Avatar, Popover, Badge, Image, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InfoSquare, ArrowNarrowRight, DotsVertical } from 'tabler-icons-react';

// TODO if statement for text/no text dependant on view
// Polishing
// Add icon boarder
// Better icon images to check view

export default function NavBarAvatar(props) {
  const boardURL = `/boards/${props.board_id} `;
  const [opened, setOpened] = useState(false);
  // console.log('props NAVBARAVATR', props);

  const board_name = props.name;

  return (
    <Link to={boardURL}>

      <List.Item
        icon={

          <Tooltip
          label={board_name}
          closeDelay={100}
          position='right'
          withArrow arrowSize={4}
          transition="pop"
          transitionDuration={100}
          transitionTimingFunction="ease"
          size=''
          >


          <Avatar
            radius='md'
            size={55}
            alt={props.name}
            src={props.image_url}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderStyle: 'solid',
              borderColor: 'gray',
              margin: 3,
            }}
          />


      </Tooltip>


        }>
      </List.Item>

    </Link>
  );
}
