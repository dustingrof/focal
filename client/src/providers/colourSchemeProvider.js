import { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '@mantine/hooks';

// Create a context
export const colourListContext = createContext();

// Create a Component wrapper from Context.Provider
export default function ColourSchemeProvider(props) {
  // here is our shared state object
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const exportedValues = { colorScheme, setColorScheme };

  return (
    <colourListContext.Provider value={exportedValues}>
      {props.children}
    </colourListContext.Provider>
  );
}
export const useBoardList = () => useContext(colourListContext);
