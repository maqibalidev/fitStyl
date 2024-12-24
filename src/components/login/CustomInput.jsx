import React from "react";

const CustomInput = ({
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  handleTouched,
  handleErrors,
}) => {
  return (
    <div className="w-100">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control w-100 my-3"
        type="text"
      />
      {handleTouched && handleErrors ? (
        <p className="text-danger">{handleErrors}</p>
      ) : null}
    </div>
  );
};

export default CustomInput;
