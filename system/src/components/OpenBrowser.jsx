import { useState } from 'react';
import { projects } from '../assets/data';
import { ExpandIcon } from '../assets/ExpandIcon';
import { InfoIcon } from '../assets/InfoIcon';
import { MinusIcon } from '../assets/MinusIcon';
import { XIcon } from '../assets/XIcon';

export const OpenBrowser = ({ setOpenBrowser, setItemsFullScreen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);
  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let browserCName = 'open-browser-container';
  if (fullScreen) {
    browserCName += ' full-screen';
  }

  const handleClose = () => {
    setOpenBrowser(false);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes('safari')) {
        copy = copy.filter((id) => id !== 'safari');
      }
      return copy;
    });
  };
  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes('safari')) {
        copy = copy.filter((id) => id !== 'safari');
      } else {
        copy.push('safari');
      }
      return copy;
    });
  };

  const openProject = (link) => {
    window.open(link, '_blank', 'noreferrer');
  };

  return (
    <div className={browserCName}>
      <div className='open-browser-container_top'>
        <div className='open-browser-container-url'>
          <p>veljkowebdev.netlify.app</p>
        </div>
        <div className='open-browser-container_top-buttons'>
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
      </div>
      <div className='open-browser-container_main'>
        <div className='browser-content'>
          <div className='browser-content_items'>
            <h2 className='browser-content_items-title'>Projects</h2>
            <div className='browser-content_items-grid'>
              {projects.map((p) => (
                <div
                  className='browser-content_items-grid-item'
                  onClick={() => openProject(p.link)}
                >
                  <img alt='' src={p.img} />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='browser-content_note'>
            <InfoIcon />
            <p>
              Projects that I worked on while at work cannot be shown here so
              these are mainly just projects I did while still learning to code.
              React Week Picker is the only one I can say has the good looking
              and employable code but I am always ready to prove myself. Also,
              this portfolio is a project as well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
