import React from "react";

const Textarea = ({ id, name, placeholder, className }) => {
  return (
    <>
      <textarea
        id={id}
        name={name}
        className={`w-full h-40 bg-transparent border border-primary outline-none px-3 py-2 focus:outline-none focus:border-primary rounded-md text-base dark:bg-dark dark:text-white font-medium  ${className}`}
        placeholder={placeholder}
      />
    </>
  );
};

export default Textarea;