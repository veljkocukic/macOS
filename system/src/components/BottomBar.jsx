import { useContext, useState } from 'react';
import FullBin from '../assets/images/Recycle_Bin_Full_23081.png';
import EmptyBin from '../assets/images/Recycle_Bin_Empty_23082.png';
import { DataContext } from '../Context';
import { RightClickMenu } from './RightClickMenu';

export const BottomBar = ({ disappear, setBinOpen, setDesktopFiles }) => {
  const [itemOver, setItemOver] = useState(false);
  const { menuState, setMenuState, trash, setTrash } = useContext(DataContext);

  let cName = 'bottom-bar-container';
  let binCName = 'recycle-bin';
  if (disappear) {
    cName += ' disappear-bottom';
  }
  if (itemOver) {
    binCName += '_darken';
  }

  const onDragOver = (e) => {
    e.preventDefault();
    setItemOver(true);
  };

  const onDragLeave = () => {
    setItemOver(false);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const data = e.dataTransfer.getData('data');
    setTrash((prev) => {
      const copy = [...prev];
      copy.push(JSON.parse(data));
      return copy;
    });
    setItemOver(false);
  };

  const handleBinClick = (e) => {
    e.stopPropagation();
    setBinOpen(true);
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

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === 'contextmenu') {
      setMenuState({
        isOpen: true,
        options: [[{ label: 'Empty Bin', func: emptyBin }]],
        position: { top: e.clientY, left: e.clientX },
      });
    }
  };

  return (
    <div className={cName}>
      {menuState.isOpen && <RightClickMenu />}
      <div
        tabIndex={1}
        className={'bottom-bar-item ' + binCName}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onContextMenu={handleMenuOpen}
        onClick={handleBinClick}
      >
        <img
          src={trash.length > 0 ? FullBin : EmptyBin}
          alt=''
          draggable='false'
        />
      </div>
    </div>
  );
};
