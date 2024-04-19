import React from "react";
import tick from "../assets/icons/tick.svg";

export const RadioButton = ({ label, selectedValue, onChange, name }) => {
  return (
    <div className="relative">
      <input
        type="radio"
        name={name}
        value={label}
        id={label.toLowerCase()}
        checked={selectedValue === label}
        onChange={onChange}
        className="appearance-none w-4 h-4 border border-white/30 rounded checked:border-dark-yellow"
      />
      {selectedValue === label && (
        <svg
          className="absolute bottom-1.5"
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 -960 960 960"
          width="16"
        >
          <path
            fill="#f89d16"
            d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
          />
        </svg>
      )}
      <label htmlFor={label.toLowerCase()} className="ml-2 text-white/60">
        {label}
      </label>
    </div>
  );
};
