import { useContext } from 'react';
import { DataContext } from '../Context';

export const RightClickMenu = () => {
  const { menuState } = useContext(DataContext);

  return (
    <div className='right-click-menu-container' style={menuState.position}>
      {menuState.options.map((section, i) => (
        <div key={i} className='right-click-menu-container_section'>
          {section.map((option, j) => (
            <div key={j} className='section-option' onClick={option.func}>
              <div className='option-label'>
                <p>{option.label}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
