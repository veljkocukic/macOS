import { useContext, useState } from 'react';
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
import { DataContext } from '../Context';
import { Icon } from './Icon/Icon';
import { SideMenuContainer } from './SideMenuContainer';

export const OpenFolder = ({
  file,
  setOpenFolders,
  setItemsFullScreen,
  setDesktopFiles,
  setBinOpen,
}) => {
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
  const { setTrash, trash } = useContext(DataContext);

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let folderCName = 'open-file-container';
  if (fullScreen) {
    folderCName += ' file-full-screen';
  }

  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  const handleClose = () => {
    if (file.name === 'Bin') {
      setBinOpen(false);
    }
    setOpenFolders((prev) => {
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

  const emptyBin = () => {
    setTrash([]);
    setDesktopFiles((prev) => {
      let copy = [...prev];
      for (let item of trash) {
        copy = copy.filter((i) => i.id !== item.id);
      }
      return copy;
    });
  };

  return (
    <div className={folderCName}>
      <div className='open-file-container_sidebar'>
        <div className='open-file-container_sidebar--top'>
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
      <div className='open-file-container_main'>
        <div className='open-file-container_main--top'>
          <div className='empty-bin-button' onClick={emptyBin}>
            <p>Empty Bin</p>
          </div>
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
        <div className='open-file-container_main--bottom'>
          {file.content.map((i) => (
            <Icon
              type={i.type}
              text={i.name}
              id={i.id}
              file={i}
              key={i.id}
              style={{ position: 'relative', height: '60px' }}
              undraggable
            />
          ))}
        </div>
      </div>
    </div>
  );
};
