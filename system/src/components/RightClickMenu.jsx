export const RightClickMenu = ({ options, position }) => {
  return (
    <div className='right-click-menu-container' style={position}>
      {options.map((section, i) => (
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
