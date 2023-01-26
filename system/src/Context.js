import React, { createContext, useState } from 'react';

export let DataContext = createContext();

export let MainProvider = (props) => {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    options: [],
    position: { top: 0, left: 0 },
  });

  const [trash, setTrash] = useState([]);
  const [anagramOpen, setAnagramOpen] = useState(false);
  const [openTextFiles, setOpenTextFiles] = useState([]);

  return (
    <DataContext.Provider
      value={{
        menuState,
        setMenuState,
        trash,
        setTrash,
        anagramOpen,
        setAnagramOpen,
        openTextFiles,
        setOpenTextFiles,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
