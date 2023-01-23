import { useState } from 'react';
import { ExpandIcon } from '../assets/ExpandIcon';
import { MinusIcon } from '../assets/MinusIcon';
import { XIcon } from '../assets/XIcon';

export const OpenText = ({ file, setOpenTextFiles, setItemsFullScreen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let textCName = 'open-text-container';
  if (fullScreen) {
    textCName += ' full-screen';
  }

  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  const handleClose = () => {
    setOpenTextFiles((prev) => {
      let copy = [...prev];
      copy = copy.filter((id) => id !== file.id);
      return copy;
    });
  };

  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes(file.id)) {
        copy = copy.filter((id) => id !== file.id);
      } else {
        copy.push(file.id);
      }
      return copy;
    });
  };

  return (
    <div className={textCName}>
      <div className='open-text-container_top'>
        <div className='open-text-container_top-buttons'>
          <div
            className={navCName}
            onClick={handleClose}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <XIcon />
          </div>
          <div
            className={navCName + ' yellow'}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <MinusIcon />
          </div>
          <div
            className={navCName + ' green'}
            onClick={handleFullScreen}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <ExpandIcon />
          </div>
        </div>
        <h5>{file.name}</h5>
      </div>
      <div className='open-text-container_main'>
        <textarea defaultValue={file.content} />
      </div>
    </div>
  );
};
