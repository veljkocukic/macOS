import React, { useState } from 'react';

export const Icon = ({ text, id, defaultPosition, setOpenFolders, type }) => {
  const [highlight, setHighlight] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const handleDrag = (e) => {
    setHighlight(true);
    if (
      !(defaultPosition.top === e.clientX && e.clientY === defaultPosition.left)
    ) {
      setCurrentPosition({ top: e.clientY - 35, left: e.clientX - 35 });
    } else {
      setPosition(currentPosition);
    }
  };

  const handleDoubleClick = (e) => {
    setHighlight(true);
    setOpenFolders((prev) => {
      const copy = [...prev];
      if (!copy.includes(id)) {
        copy.push(id);
      }
      return copy;
    });
    e.stopPropagination();
  };

  let iconImage = '';
  switch (type) {
    case 'folder':
      iconImage =
        'https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png';
      break;
    default:
      iconImage =
        'https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png';
  }

  let cName = 'icon-container';
  if (highlight) {
    cName += ' highlight';
  }

  const handleClick = (e) => {
    setHighlight(true);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      tabIndex='1'
      onClick={handleClick}
      onBlur={() => setHighlight(false)}
      draggable
      onDrag={handleDrag}
      style={position}
      className={cName}
    >
      <img draggable='false' src={iconImage} alt='' />
      <p>{text}</p>
    </div>
  );
};
