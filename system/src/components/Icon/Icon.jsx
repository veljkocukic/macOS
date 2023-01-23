import React, { useEffect, useRef, useState } from 'react';

export const Icon = ({
  text,
  id,
  defaultPosition,
  setOpenFolders,
  type,
  newFolder,
}) => {
  const [highlight, setHighlight] = useState(false);
  const [nameEditing, setNameEditing] = useState(newFolder);
  const [position, setPosition] = useState(defaultPosition);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [name, setName] = useState(text);
  const inputRef = useRef();

  useEffect(() => {
    if (nameEditing) {
      inputRef.current.focus();
    }
  }, [nameEditing]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setNameEditing(false);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const handleDrag = (e) => {
    setHighlight(true);
    if (!(0 === e.clientX && e.clientY === 0)) {
      setCurrentPosition({ top: e.clientY - 35, left: e.clientX - 35 });
    } else {
      setPosition(currentPosition);
    }
  };

  const handleDoubleClick = () => {
    setHighlight(true);
    setOpenFolders((prev) => {
      const copy = [...prev];
      if (!copy.includes(id)) {
        copy.push(id);
      }
      return copy;
    });
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

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setNameEditing(false);
    setHighlight(false);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      tabIndex='1'
      onBlur={handleBlur}
      onClick={handleClick}
      draggable
      onDrag={handleDrag}
      style={position}
      className={cName}
    >
      <img draggable='false' src={iconImage} alt='' />
      {!nameEditing ? (
        <p>{name}</p>
      ) : (
        <input
          ref={inputRef}
          value={name || ''}
          onChange={handleName}
          style={{ width: name.length + 'em' }}
        />
      )}
    </div>
  );
};