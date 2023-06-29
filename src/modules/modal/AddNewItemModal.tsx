import React from "react";
import { useState, useRef, useEffect } from "react";
import { ITodoTypes } from "../utils/items";
import { v4 as uuidv4 } from "uuid";

interface IAddNewItemModalProps {
  closeModal: () => void;
  itemsArray: ITodoTypes[];
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
}

const AddNewItemModal: React.FC<IAddNewItemModalProps> = ({
  closeModal,
  itemsArray,
  setItemsArray,
}) => {
  const [itemTitle, setItemTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const addNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTask: ITodoTypes = {
      id: uuidv4(),
      title: itemTitle,
      completed: false,
    };
    setItemsArray([...itemsArray, newTask]);
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
        <div className=" h-4/5">
          <form className="flex flex-col h-2/5 gap-2">
            <input
              ref={inputRef}
              className="px-2 w-full h-10  border-2 border-black"
              type="text"
              value={itemTitle}
              onChange={handleChange}
            />
            <button className="bg-black w-full font-medium h-10 text-white">
              Add new task
            </button>
          </form>
          <div className="pl-2">
            <li>Title: {itemTitle}</li>
            <li>Completed: False </li>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={closeModal}
            className="bg-red-500  text-white w-full h-10 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewItemModal;
