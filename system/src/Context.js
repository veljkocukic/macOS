import React, { createContext, useState } from 'react';

export let DataContext = createContext();

export let MainProvider = (props) => {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    options: [],
    position: { top: 0, left: 0 },
  });

  const [trash, setTrash] = useState([]);

  return (
    <DataContext.Provider value={{ menuState, setMenuState, trash, setTrash }}>
      {props.children}
    </DataContext.Provider>
  );
};
