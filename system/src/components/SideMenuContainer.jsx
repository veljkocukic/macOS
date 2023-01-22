import { ChevronIcon } from '../assets/ChevronIcon';
import { useState } from 'react';

export const SideMenuContainer = ({ title, options }) => {
  const [open, setOpen] = useState(true);

  let cName = 'folder-items-container';
  if (open) {
    cName += ' open-menu';
  }
  return (
    <div className={cName}>
      <div
        className='folder-items-container_title'
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>{title}</p>
        <ChevronIcon />
      </div>
      <div className='folder-items-container_list'>
        {options.map((o, i) => {
          return (
            <div className='folder-items-container_list--item' key={i}>
              {o.icon}
              {o.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
