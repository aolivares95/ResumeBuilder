import * as React from "react";

interface ICustomSelectBox {
  items: any[];
  handleSelect: (event: any) => void;
}

const CustomSelectBox = ({ items, handleSelect }: ICustomSelectBox) => {
  let selectedItem: any;

  const itemsForDisplay = items.map((item: any, idx) => (
    <option value={item.uuid} key={`select-option-${item.uuid}`}>
      {idx + 1}: {item.name}
    </option>
  ));

  const handleValue = (event: any) => {
    selectedItem = event.target.value;
  };

  return (
    <select defaultValue={""} onChange={handleSelect} onSelect={handleValue}>
      {selectedItem ? (
        <option>
          SELECTED: {selectedItem.id}:{selectedItem.name}
        </option>
      ) : (
        <option>Select a Resume to edit</option>
      )}
      {itemsForDisplay}
    </select>
  );
};

export default CustomSelectBox;
