import { useContext, useRef, useState } from 'react';
import './App.css';
import { BottomBar } from './components/BottomBar';
import { Icon } from './components/Icon/Icon';
import { OpenBrowser } from './components/OpenBrowser';
import { OpenFolder } from './components/OpenFolder';
import { OpenPdf } from './components/OpenPdf';
import { OpenText } from './components/OpenText';
import { RightClickMenu } from './components/RightClickMenu';
import { TopBar } from './components/TopBar';
import { DataContext } from './Context';
import { files } from './files';

function App() {
  const backgroundRef = useRef();
  const [openFolders, setOpenFolders] = useState([]);
  const [openPdfs, setOpenPdfs] = useState([]);
  const [openTextFiles, setOpenTextFiles] = useState([]);
  const [openBrowser, setOpenBrowser] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState(files);
  const [itemsFullScreen, setItemsFullScreen] = useState([]);
  const [binOpen, setBinOpen] = useState(false);
  const { menuState, setMenuState, trash } = useContext(DataContext);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      setMenuState({
        isOpen: true,
        options: menuOptions,
        position: { top: e.clientY, left: e.clientX },
      });
    }
  };

  const handleClick = () => {
    setMenuState({ isOpen: false });
  };

  const createNewFolder = (e) => {
    setDesktopFiles((prev) => {
      const copy = [...prev];
      copy.push({
        id: copy.length + 1,
        name: 'New Folder',
        type: 'folder',
        content: [],
        defaultPosition: { top: e.clientY, left: e.clientX },
      });
      return copy;
    });
  };

  const menuOptions = [
    [{ label: 'New Folder', func: createNewFolder }],
    [{ label: 'Get Info' }, { label: 'Change Wallpaper...' }],
    [
      { label: 'Use Stacks' },
      { label: 'Sort By' },
      { label: 'Clean Up' },
      { label: 'Clean Up By' },
      { label: 'Show View Options' },
    ],
  ];

  return (
    <div
      ref={backgroundRef}
      className='desktop-background'
      onClick={handleClick}
      onContextMenu={handleRightClick}
      style={{ position: 'relative' }}
    >
      <TopBar disappear={itemsFullScreen.length > 0} />
      {desktopFiles.map((file) => {
        return !trash.some((t) => t.id === file.id) ? (
          <Icon
            type={file.type}
            text={file.name}
            id={file.id}
            file={file}
            key={file.id}
            defaultPosition={file.defaultPosition}
            setOpenTextFiles={setOpenTextFiles}
            setOpenFolders={setOpenFolders}
            setOpenPdfs={setOpenPdfs}
            newFolder={!files.some((f) => f.id === file.id)}
            setOpenBrowser={setOpenBrowser}
          />
        ) : null;
      })}
      {openFolders.map((id) => (
        <OpenFolder
          key={id}
          setOpenFolders={setOpenFolders}
          file={desktopFiles.find((f) => f.id === id)}
          setItemsFullScreen={setItemsFullScreen}
        />
      ))}
      {openPdfs.map((id) => (
        <OpenPdf
          key={id}
          setOpenPdfs={setOpenPdfs}
          file={desktopFiles.find((f) => f.id === id)}
          setItemsFullScreen={setItemsFullScreen}
        />
      ))}
      {openTextFiles.map((id) => (
        <OpenText
          key={id}
          setOpenTextFiles={setOpenTextFiles}
          file={desktopFiles.find((f) => f.id === id)}
          setItemsFullScreen={setItemsFullScreen}
        />
      ))}

      {menuState.isOpen && <RightClickMenu />}
      {binOpen && (
        <OpenFolder
          setBinOpen={setBinOpen}
          key={'bin'}
          setOpenFolders={setOpenFolders}
          file={{
            id: 'bin',
            name: 'Bin',
            type: 'bin',
            content: trash,
          }}
          setDesktopFiles={setDesktopFiles}
          setItemsFullScreen={setItemsFullScreen}
        />
      )}
      {openBrowser && (
        <OpenBrowser
          setOpenBrowser={setOpenBrowser}
          setItemsFullScreen={setItemsFullScreen}
        />
      )}
      <BottomBar
        trash={trash}
        setBinOpen={setBinOpen}
        disappear={itemsFullScreen.length > 0}
        setDesktopFiles={setDesktopFiles}
      />
    </div>
  );
}

export default App;
