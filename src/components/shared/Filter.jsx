import React from "react";

function Filter({
  items,
  onSelectItem,
  title,
  selectedItem,
  textProperty,
  valueProperty,
}) {
  return (
    <ul className="list-group">
      <li className="list-group-item">{title}</li>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item[textProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectItem(item[textProperty])}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Filter;
