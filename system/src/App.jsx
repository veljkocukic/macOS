import { useRef, useState } from 'react';
import './App.css';
import { Icon } from './components/Icon/Icon';
import { OpenFolder } from './components/OpenFolder';
import { RightClickMenu } from './components/RightClickMenu';
import { files } from './files';

function App() {
  const backgroundRef = useRef();
  const [openFolders, setOpenFolders] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState(files);
  const handleRightClick = (e) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      setMenuPosition({ top: e.clientY, left: e.clientX });
      setMenuOpen(true);
    }
  };

  const handleClick = () => {
    setMenuOpen(false);
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
      console.log(copy);
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
    >
      {desktopFiles.map((file) => {
        return (
          <Icon
            type={file.type}
            text={file.name}
            id={file.id}
            key={file.id}
            defaultPosition={file.defaultPosition}
            setOpenFolders={setOpenFolders}
            newFolder={!files.some((f) => f.id === file.id)}
          />
        );
      })}
      {openFolders.map((id) => (
        <OpenFolder
          key={id}
          setOpenFolders={setOpenFolders}
          file={desktopFiles.find((f) => f.id === id)}
        />
      ))}
      {menuOpen && (
        <RightClickMenu options={menuOptions} position={menuPosition} />
      )}
    </div>
  );
}

export default App;
