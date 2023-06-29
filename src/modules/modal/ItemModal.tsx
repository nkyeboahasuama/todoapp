<<<<<<< HEAD
import React, { useRef } from "react";
import { useState, useEffect } from "react";
=======
import React from "react";
import { useState } from "react";
>>>>>>> 2cd78eb7e98b533eeadeee8c0a984b32b711d29c
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [itemTitle, setItemTitle] = useState(selectedItem.title);
  const [item, setItem] = useState(selectedItem);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const updatingItemsArray = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedItem = { ...selectedItem, title: itemTitle };
    setItem(updatedItem);
    editTask && editTask(updatedItem);
    closeModal();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black bg-opacity-30 flex justify-center absolute top-0 left-0 items-center">
      <div className="w-11/12 h-2/5 flex flex-col justify-between bg-white text-black p-3">
        <div className=" h-4/5 flex flex-col">
          <form className="flex flex-col gap-2  h-2/5">
            <input
              ref={inputRef}
              className="px-2 w-full h-10 border-2 border-black"
              type="text"
              value={itemTitle}
              onChange={handleChange}
            />
            <button
              className="bg-black w-full font-medium text-white h-10"
              onClick={updatingItemsArray}
            >
              Save changes
            </button>
          </form>
          <div className="pl-2">
            <li>Title: {item.title}</li>
            <li>Completed: {item.completed ? "True" : "False"} </li>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
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
