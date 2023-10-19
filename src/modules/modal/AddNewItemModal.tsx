import React from "react";
import { useState, useRef, useEffect } from "react";
import dataService from "../../services/dataService";
import { useAppDispatch } from "../../redux/hooks/hooks";

interface IAddNewItemModalProps {
  closeModal: () => void;
}

const AddNewItemModal: React.FC<IAddNewItemModalProps> = ({ closeModal }) => {
  const [itemTitle, setItemTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const addNewTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTask: any = {
      title: itemTitle,
      completed: false,
    };

    dataService.addTask(newTask, dispatch);
    closeModal();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black bg-opacity-30 flex justify-center absolute top-0 left-0 items-center">
      <div className="w-11/12 flex flex-col justify-between bg-white text-black p-3">
        <div className="">
          <form className="flex flex-col h-2/5 gap-2 mb-5">
            <input
              ref={inputRef}
              className="px-2 w-full h-10  border-2 border-black"
              type="text"
              value={itemTitle}
              onChange={handleChange}
            />
            <button
              onClick={addNewTask}
              className="bg-black w-full h-10 font-medium text-white"
            >
              Add new task
            </button>
          </form>
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
