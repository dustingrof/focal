import { useState } from 'react';
import {  Button, Select, Group, Center  } from '@mantine/core';

const Login = () => {
  const [ user, setUser ] = useState()
  
  // Sets user from <Select> dropdown to local storage
  const addUserToLocalState = () => {
    localStorage.setItem("name", user);
  };
  
  // Removes current user from local storage
  const removeUserFromLocalState = () => {
    localStorage.removeItem("name");
  }

  return (
    <Center >
      <Group position="center" spacing="sm">
      <Select  placeholder="Login as ..." onChange={ (event => setUser(event)) } size="xs" 
        data={[
          { value: 'Dustin', label: 'Dustin' },
          { value: 'Iaan', label: 'Iaan' },
          { value: 'Nicole', label: 'Nicole' }
        ]}
      />
        <Button compact className="login-btn" onClick={ addUserToLocalState }>Login {}</Button>
        <Button compact className="logout-btn" onClick={ removeUserFromLocalState }>Logout</Button>
      </Group>
    </Center>
  )
};

export default Login;
