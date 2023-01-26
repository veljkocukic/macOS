import { useContext, useState } from 'react';
import { ExpandIcon } from '../assets/ExpandIcon';
import { MinusIcon } from '../assets/MinusIcon';
import { XIcon } from '../assets/XIcon';
import { DataContext } from '../Context';

export const OpenAnagramApp = ({ setItemsFullScreen }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [navigateVisible, setNavigateVisible] = useState(false);
  const { setAnagramOpen } = useContext(DataContext);
  const [state, setState] = useState({
    firstWord: '',
    secondWord: '',
    clicked: false,
    message: '',
  });
  const toggleIconsVisible = (bool) => {
    setNavigateVisible(bool);
  };

  let navCName = 'navigate-circle';
  if (navigateVisible) {
    navCName += ' icons-visible';
  }

  let anagramCName = 'open-anagram-app-container';
  if (fullScreen) {
    anagramCName += ' full-screen';
  }

  const handleClose = () => {
    setAnagramOpen(false);
  };
  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);
    setItemsFullScreen((prev) => {
      let copy = [...prev];
      if (copy.includes('anagram')) {
        copy = copy.filter((id) => id !== 'anagram');
      } else {
        copy.push('anagram');
      }
      return copy;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      const copy = { ...prev };
      copy[name] = value;
      return copy;
    });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setState((prev) => {
      const copy = { ...prev };
      copy.clicked = true;
      const firstWordLowerCase = state.firstWord.toLowerCase();
      const secondtWordLowerCase = state.secondWord.toLowerCase();
      let isAnagram;

      if (!state.firstWord || !state.secondWord) {
        copy.message = 'Inputs must be valid';
      } else if (firstWordLowerCase.length === secondtWordLowerCase.length) {
        let firstWordSplitted = firstWordLowerCase.split('');
        let secondWordSplitted = secondtWordLowerCase.split('');
        isAnagram = firstWordSplitted.every(
          (char) => secondWordSplitted.indexOf(char) > -1
        );
        copy.message = isAnagram
          ? 'Words are anagrams'
          : 'Words are not anagrams';
      }
      return copy;
    });
  };
  return (
    <div className={anagramCName}>
      <div className='open-anagram-app-container_top'>
        <div className='open-anagram-app-container_top-buttons'>
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
        <h3>Anagram Checker</h3>
      </div>
      <div className='open-anagram-app-container-main'>
        <input
          type='text'
          name='firstWord'
          placeholder='First word'
          value={state.firstWord || ''}
          onChange={handleChange}
        />
        <input
          type='text'
          name='secondWord'
          placeholder='Second word'
          value={state.secondWord || ''}
          onChange={handleChange}
        />
        <button onClick={handleCheck}>Check</button>
        {true && <p>{state.message}</p>}
      </div>
    </div>
  );
};
