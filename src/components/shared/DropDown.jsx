import React from "react";

const DropDown = ({
  name,
  label,
  error,
  collection,
  handleSelect,
  value,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {collection.length && (
        <>
          <select
            {...rest}
            id={name}
            name={name}
            className="form-control"
            onChange={handleSelect}
          >
            <option>Select category</option>
            {collection.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
