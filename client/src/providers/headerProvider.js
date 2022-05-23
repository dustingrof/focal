import { createContext, useState, useEffect, useContext } from 'react';

// Create a context
export const headerContext = createContext();
export const useHeader = () => useContext(headerContext);

// Create a Component wrapper from Context.Provider
export default function HeaderProvider(props) {
  // here is our shared state object
  const [currentAvatar, setCurrentAvatar] = useState(
    localStorage.getItem('avatar')
  );
  const [user, setUser] = useState(localStorage.getItem('name'));
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem('UserId')
  );

  useEffect(() => {
    setCurrentAvatar(localStorage.getItem('avatar'));
    setCurrentUserId(localStorage.getItem('userId'));
  }, [user]);

  const providerData = {
    currentAvatar,
    setCurrentAvatar,
    user,
    setUser,
    currentUserId,
    setCurrentUserId,
  };

  return (
    <headerContext.Provider value={providerData}>
      {props.children}
    </headerContext.Provider>
  );
}
