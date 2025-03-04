import React from "react";

const FormTextarea = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-36"
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
};

export default FormTextarea;
