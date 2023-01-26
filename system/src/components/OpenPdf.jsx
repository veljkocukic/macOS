import { ExpandIcon } from '../assets/ExpandIcon';
import { MinusIcon } from '../assets/MinusIcon';
import { XIcon } from '../assets/XIcon';
import { useState } from 'react';

export const OpenPdf = ({ setOpenPdfs, file, setItemsFullScreen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);
  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let fileCName = 'open-pdf-container';
  if (fullScreen) {
    fileCName += ' pdf-full-screen';
  }

  const handleClose = () => {
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes(file.id)) {
        copy = copy.filter((id) => id !== file.id);
      }
      return copy;
    });
    setOpenPdfs((prev) => {
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
    <div className={fileCName}>
      <div className='open-pdf-container-top'>
        <div className='open-pdf-container_sidebar--top'>
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
        <h3>{file.name}</h3>
      </div>
      <div className='open-pdf-container-main'>
        <img src={file.content} alt='' />
      </div>
    </div>
  );
};
