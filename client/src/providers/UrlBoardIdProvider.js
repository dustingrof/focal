import { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Create a context
export const UrlBoardIdContext = createContext();

// Create a Component wrapper from Context.Provider
export default function UrlBoardIdProvider(props) {
  // here is our shared state object
  const theseParams = useParams();

  const [urlBoardId, setUrlBoardId] = useState(1);



  // If statement checks if object has been rendered yet
  useEffect(() => {
    if (theseParams.board_id) {
      setUrlBoardId(theseParams.board_id);
    }
    
  }, [theseParams.board_id]);

  const exportedValues = { urlBoardId, setUrlBoardId };

  return (
    <UrlBoardIdContext.Provider value={exportedValues}>
      {props.children}
    </UrlBoardIdContext.Provider>
  );
}
export const useUrlBoardIdContext = () => useContext(UrlBoardIdContext);
