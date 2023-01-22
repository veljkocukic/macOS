export const RightClickMenu = ({ options, position }) => {
  return (
    <div className='right-click-menu-container' style={position}>
      {options.map((section) => (
        <div className='right-click-menu-container_section'>
          {section.map((option) => (
            <div className='section-option'>
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
