import React, { useEffect } from "react";
import { useState } from "react";
import { ITodoTypes } from "../utils/items";

interface IItemModalProps {
  closeModal: () => void;
  selectedItem: ITodoTypes;
  editTask?: (newItem: ITodoTypes) => void;
}

const ItemModal: React.FC<IItemModalProps> = ({
  closeModal,
  selectedItem,
  editTask,
}) => {
  const [itemTitle, setItemTitle] = useState(selectedItem.title);
  const [item, setItem] = useState(selectedItem);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const updatingItemsArray = () => {
    setItem({ ...selectedItem, title: itemTitle });
  };

  useEffect(() => {
    if (editTask) {
      editTask(item);
    }
  }, [item]);

  return (
    <div className="w-full h-screen bg-black bg-opacity-30 flex justify-center absolute top-0 left-0 items-center">
      <div className="w-11/12 h-2/5 bg-white text-black px-5 py-2">
        <div className=" h-4/5 flex flex-col">
          <div className="flex flex-col gap-2  h-2/5">
            <input
              className="px-2 w-full h-10 border-2 border-black"
              type="text"
              value={itemTitle}
              onChange={handleChange}
            />
            <button
              className="bg-black font-medium text-white h-10"
              onClick={updatingItemsArray}
            >
              Save
            </button>
          </div>
          <div>
            <li>Title: {item.title}</li>
            <li>Completed: {item.completed ? "True" : "False"} </li>
          </div>
        </div>
        <div className="w-full h-1/5 flex justify-center items-center">
          <button
            className="bg-red-600 font-medium text-white h-10 w-full"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
