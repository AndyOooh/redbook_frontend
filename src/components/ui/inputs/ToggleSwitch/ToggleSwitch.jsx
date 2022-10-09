import React from 'react';
import PropTypes from 'prop-types';
import './ToggleSwitch.scss';

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id={id} checked={value} onChange={checked => setValue(checked)}} />
*/

export const ToggleSwitch = ({
  id,
  name,
  // checked,
  onChange,
  optionLabels = ['yes', 'no'],
  small,
  disabled,
  size = '3rem',
  color,
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleKeyPress = e => {
    if (e.keyCode !== 32) return;
    e.preventDefault();
    onChange(!checked);
  };
  console.log(name, 'cheked ?', checked);

  return (
    <div className='toggle-switch' style={{ height: size }}>
      <input
        className='toggle-switch-checkbox'
        type='checkbox'
        name={id}
        id={id}
        disabled={disabled}
        checked={checked}
        // onChange={e => onChange(e.target.checked)}
        // onChange={e => onChange(e)}
        onChange={e => setChecked(e.target.checked)}
      />
      {id ? (
        <label
          className='toggle-switch-label'
          htmlFor={id}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={e => {
            handleKeyPress(e);
          }}>
          <span
            className={'toggle-switch-switch' + (disabled ? 'toggle-switch-disabled' : '')}
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

// Set optionLabels for rendering.
// ToggleSwitch.defaultProps = {
//   optionLabels: ['Yes', 'No'],
// };

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
};
