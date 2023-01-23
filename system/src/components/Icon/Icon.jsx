import React, { useEffect, useRef, useState } from 'react';
import PdfIcon from '../../assets/pdf-icon.png';
import TextIcon from '../../assets/ticon.png';

export const Icon = ({
  text,
  id,
  setOpenTextFiles,
  defaultPosition,
  setOpenFolders,
  setOpenPdfs,
  type,
  newFolder,
  file,
  undraggable,
  style,
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

    if (type === 'folder') {
      setOpenFolders &&
        setOpenFolders((prev) => {
          const copy = [...prev];
          if (!copy.includes(id)) {
            copy.push(id);
          }
          return copy;
        });
    } else if (type === 'pdf') {
      setOpenPdfs &&
        setOpenPdfs((prev) => {
          const copy = [...prev];
          if (!copy.includes(id)) {
            copy.push(id);
          }
          return copy;
        });
    } else {
      setOpenTextFiles &&
        setOpenTextFiles((prev) => {
          const copy = [...prev];
          if (!copy.includes(id)) {
            copy.push(id);
          }
          return copy;
        });
    }
  };

  let iconImage = '';
  switch (type) {
    case 'folder':
      iconImage =
        'https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png';
      break;
    case 'pdf':
      iconImage = PdfIcon;
      break;
    case 'text':
      iconImage = TextIcon;
      break;
    default:
      iconImage =
        'https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png';
      break;
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

  const onDragStart = (e) => {
    e.dataTransfer.setData('data', JSON.stringify(file));
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      tabIndex='1'
      onBlur={handleBlur}
      onDragStart={onDragStart}
      onClick={handleClick}
      draggable={!undraggable}
      onDrag={handleDrag}
      style={{ ...position, ...style }}
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
