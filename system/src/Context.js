import React, { createContext, useState } from 'react';

export let DataContext = createContext();

export let MainProvider = (props) => {
  const [currentlyDragging, setCurrentlyDragging] = useState(null);

  return (
    <DataContext.Provider value={{ currentlyDragging, setCurrentlyDragging }}>
      {props.children}
    </DataContext.Provider>
  );
};
