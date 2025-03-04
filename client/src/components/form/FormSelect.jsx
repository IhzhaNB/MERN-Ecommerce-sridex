import React from "react";

const FormSelect = ({ label, name, lists, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered"
        defaultValue={defaultValue}
      >
        {lists.map((list) => (
          <option key={list} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
