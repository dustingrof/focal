import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a context
export const boardListContext = createContext();

// Create a Component wrapper from Context.Provider
export default function BoardListProvider(props) {
  // here is our shared state object
  const [boardList, setBoardList] = useState({});


  // If statement checks if object has been rendered yet

    useEffect(() => {
      if(Object.keys(boardList).length === 0){
        axios.get('boards/').then(results => {
          const listOfBoards = results.data;
          setBoardList(listOfBoards);
        });
      }
    },[boardList])
  
  const exportedValues = { boardList };

  return (
    <boardListContext.Provider value={ exportedValues }>
      {props.children}
    </boardListContext.Provider>
  );
}
export const useBoardList = () => useContext(boardListContext);