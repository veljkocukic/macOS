import { useState } from "react";
import { projects } from "../assets/data";
import { ExpandIcon } from "../assets/ExpandIcon";
import { InfoIcon } from "../assets/InfoIcon";
import { MinusIcon } from "../assets/MinusIcon";
import { XIcon } from "../assets/XIcon";

export const OpenBrowser = ({ setOpenBrowser, setItemsFullScreen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);
  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  let navCName = "navigate-circle";
  if (navigateVisible) {
    navCName += " icons-visible";
  }

  let browserCName = "open-browser-container";
  if (fullScreen) {
    browserCName += " full-screen";
  }

  const handleClose = () => {
    setOpenBrowser(false);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes("safari")) {
        copy = copy.filter((id) => id !== "safari");
      }
      return copy;
    });
  };
  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes("safari")) {
        copy = copy.filter((id) => id !== "safari");
      } else {
        copy.push("safari");
      }
      return copy;
    });
  };

  const openProject = (link) => {
    window.open(link, "_blank", "noreferrer");
  };

  return (
    <div className={browserCName}>
      <div className="open-browser-container_top">
        <div className="open-browser-container-url">
          <p>veljkowebdev.netlify.app</p>
        </div>
        <div className="open-browser-container_top-buttons">
          <div
            className={navCName}
            onClick={handleClose}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <XIcon />
          </div>
          <div
            className={navCName + " yellow"}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <MinusIcon />
          </div>
          <div
            className={navCName + " green"}
            onClick={handleFullScreen}
            onMouseEnter={() => toggleIconsVisible(true)}
            onMouseLeave={() => toggleIconsVisible(false)}
          >
            <ExpandIcon />
          </div>
        </div>
      </div>
      <div className="open-browser-container_main">
        <div className="browser-content">
          <div className="browser-content_note">
            <InfoIcon />
            <p>
              Project shown bellow are not part of my professional work but
              rather side projects. Most of my work was done for the companies I
              worked for so I couldn't put it here but I would gladly discuss
              those on the interview. Calaus Application is the only serious
              project that was actually meant to be launched as an app but
              because multiple reasons, that never happened.
            </p>
          </div>
          <div className="browser-content_items">
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}} >
            <h2 className="browser-content_items-title">Projects</h2>
           <a style={{color:'white', textDecoration:'none'}} href="https://github.com/veljkocukic" >My Github</a>
            </div>
            <div className="browser-content_items-grid">
              {projects.map((p) => (
                <div
                  className="browser-content_items-grid-item"
                  onClick={() => openProject(p.link)}
                >
                  <img alt="" src={p.img} />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
