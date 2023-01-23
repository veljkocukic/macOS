import { UpFilledIcon } from '../assets/UpFilledIcon';
import { daysOfTheWeek, months } from '../assets/data';
import { addZero } from '../utils/helpers';

export const TopBar = () => {
  const finderList = [
    <UpFilledIcon />,
    'Searcher',
    'File',
    'Edit',
    'View',
    'Go',
    'Window',
    'Help',
  ];

  const getTimeDate = () => {
    const now = new Date();
    return `${daysOfTheWeek[now.getDay() - 1]} ${now.getDate()} ${
      months[now.getMonth()]
    } ${addZero(now.getHours())}:${addZero(now.getMinutes())}`;
  };
  return (
    <div className='top-bar-container'>
      <div className='top-bar-current-program'>
        {finderList.map((i, k) => (
          <div className='top-bar-current-program__option' key={k}>
            {i}
          </div>
        ))}
      </div>
      <div className='top-bar-icons-right'>
        <div className='time-date'>
          <p>{getTimeDate()}</p>
        </div>
      </div>
    </div>
  );
};
