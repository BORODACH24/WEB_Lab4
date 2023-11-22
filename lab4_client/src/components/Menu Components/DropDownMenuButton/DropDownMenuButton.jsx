import React, { useState } from 'react';
import classes from "./DropDownMenuButton.module.css"

function DropDownMenuButton({ children, onMainClick, buttons, menuState, ...props }) {
    const [state, setState] = useState(false);
    function isOpen() {
        setState(!state);
    }

  return (
      <div className={classes.dropDown} style={{ display: menuState ? 'flex' : 'none' }} >
          <div className={ classes.Button }>
              <button onClick={onMainClick} className={classes.mainButton}>{children}</button>
              <button className={classes.dropDownButton} onClick={isOpen}>
                  {state
                      ?<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ÑÑÑÑÑÑ" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path></g></svg>
                      : <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ÑÑÑÑÑÑ" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></g></svg>
                  }
              </button>
          </div>
          <div className={classes.groupBackground} style={{ display: state ? 'flex' : 'none' }}>
              {buttons.map(button => 
                  <div className={classes.groupButton}>
                      <div className={classes.groupButtonEllipse}></div>
                      <div className={classes.groupButtonText}>
                          <label>
                              {button.name}
                          </label>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
}

export default DropDownMenuButton;