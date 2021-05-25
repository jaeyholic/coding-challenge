import { useDisclosure } from '@chakra-ui/hooks';
import React from 'react';

const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [state, setState] = React.useState({});
  const [title, setTitle] = React.useState('');
  const [id, setId] = React.useState('');
  const [mode, setMode] = React.useState('');

  const handleClick = (state, title, id, mode) => {
    setState(state);
    setTitle(title);
    setId(id);
    setMode(mode);
    onOpen();
  };

  return (
    <AppContext.Provider
      value={{ state, title, id, mode, isOpen, onClose, handleClick }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);
