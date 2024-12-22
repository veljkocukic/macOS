import React, { useContext, useEffect, useRef, useState } from 'react';
import PdfIcon from '../../assets/pdf-icon.png';
import TextIcon from '../../assets/ticon.png';
import SafariIcon from '../../assets/safari.png';
import AnagramIcon from '../../assets/AnagramIcon.png';
import { DataContext } from '../../Context';

export const Icon = ({
  text,
  id,
  defaultPosition,
  setOpenFolders,
  setOpenBrowser,
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
  const { setAnagramOpen, setOpenTextFiles } = useContext(DataContext);
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
    e.preventDefault()
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
    } else if (type === 'safari') {
      setOpenBrowser(true);
    } else if (type === 'anagram') {
      setAnagramOpen(true);
    } else {
      setOpenTextFiles &&
        setOpenTextFiles((prev) => {
          const copy = [...prev];
          if (!copy.some((tf) => tf.id === file.id)) {
            copy.push(file);
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
    case 'safari':
      iconImage = SafariIcon;
      break;
    case 'anagram':
      iconImage = AnagramIcon;
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

  const handleRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      tabIndex='1'
      onBlur={handleBlur}
      onDragStart={onDragStart}
      onDragEnd={(e)=>e.preventDefault()}
      onDrop={(e)=>e.preventDefault()}
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
