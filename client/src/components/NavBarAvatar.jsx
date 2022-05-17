import { List, Avatar } from '@mantine/core';

// TODO if statement for text/no text dependant on view
// Polishing
// Add icon boarder
// Better icon images to check view

export default function NavBarAvatar(props) {
  const boardURL = `/boards/${props.board_id} `;
  return (

    <List.Item icon={<Avatar radius="md" size="lg" src={props.image_url} href={boardURL} component="a"/>}>
      {props.name}
    </List.Item>

  );
};