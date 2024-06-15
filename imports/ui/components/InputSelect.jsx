import React from "react";

const InputSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  errorMessage,
  defaultValue,
}) => {
  return (
    <div className="select">
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            disabled={option.disabled}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="select_arrow"></div>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default InputSelect;
