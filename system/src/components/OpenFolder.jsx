import { useState } from 'react';
import { AirDropIcon } from '../assets/AirDropIcon';
import { ChevronIcon } from '../assets/ChevronIcon';
import { CloudIcon } from '../assets/CloudIcon';
import { DesktopIcon } from '../assets/DesktopIcon';
import { DocumentIcon } from '../assets/DocumentIcon';
import { DownloadIcon } from '../assets/DownloadIcon';
import { ExpandIcon } from '../assets/ExpandIcon';
import { MinusIcon } from '../assets/MinusIcon';
import { RecentsIcon } from '../assets/RecentsIcon';
import { XIcon } from '../assets/XIcon';
import { SideMenuContainer } from './SideMenuContainer';

export const OpenFolder = ({ file, setOpenFolders }) => {
  const favList = [
    { icon: <AirDropIcon />, label: 'AirDrop' },
    { icon: <RecentsIcon />, label: 'Recents' },
    { icon: <DesktopIcon />, label: 'Desktop' },
    { icon: <DocumentIcon />, label: 'Documents' },
    { icon: <DownloadIcon />, label: 'Download' },
  ];
  const iList = [
    { icon: <CloudIcon />, label: 'iCloud Drive' },
    { icon: <RecentsIcon />, label: 'Recents' },
  ];
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let folderCName = 'open-folder-container';
  if (fullScreen) {
    folderCName += ' full-screen';
  }

  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  const handleClose = () => {
    setOpenFolders((prev) => {
      let copy = [...prev];
      copy = copy.filter((id) => id !== file.id);
      return copy;
    });
  };

  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  return (
    <div className={folderCName}>
      <div className='open-folder-container_sidebar'>
        <div className='open-folder-container_sidebar--top'>
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
        <div
          style={{ height: '100%', overflow: 'auto' }}
          className='scroll-container'
        >
          <SideMenuContainer title='Favourites' options={favList} />
          <SideMenuContainer title='iCloud' options={iList} />
        </div>
      </div>
      <div className='open-folder-container_main'>
        <div className='open-folder-container_main--top'>
          <div className='chevron-container'>
            <div className='chevron-back'>
              <ChevronIcon />
            </div>
            <div className='chevron-forwards'>
              <ChevronIcon />
            </div>
          </div>
          <h3>{file.name}</h3>
          <div className='options-container'></div>
        </div>
      </div>
    </div>
  );
};
