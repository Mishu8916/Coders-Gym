import React from "react";

const Input = ({ type, id, name, placeholder, className, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        className={`w-full h-11 bg-transparent border dark:hover:border-primary hover:border-primary outline-none px-3 focus:outline-none focus:primary/20 rounded-md text-base dark:text-white text-black font-medium ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;