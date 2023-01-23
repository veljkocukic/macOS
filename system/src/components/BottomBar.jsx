import { useState } from 'react';
import FullBin from '../assets/images/Recycle_Bin_Full_23081.png';
import EmptyBin from '../assets/images/Recycle_Bin_Empty_23082.png';

export const BottomBar = ({ disappear, trash, setTrash }) => {
  const [itemOver, setItemOver] = useState(false);
  let cName = 'bottom-bar-container';
  let binCName = 'recycle-bin';
  if (disappear) {
    cName += '_disappear';
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
      copy.push(JSON.parse(data).id);
      return copy;
    });
    setItemOver(false);
  };

  return (
    <div className={cName}>
      <div
        tabIndex={1}
        className={'bottom-bar-item ' + binCName}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
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
