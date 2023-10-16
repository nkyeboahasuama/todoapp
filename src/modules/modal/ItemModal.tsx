import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { ITask, ITodoTypes } from "../utils/items";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/itemsSlice";
import { ApiRoutes } from "../utils/proxy";

interface IItemModalProps {
  closeModal: () => void;
  selectedItem: ITask;
}

const ItemModal: React.FC<IItemModalProps> = ({ closeModal, selectedItem }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [itemTitle, setItemTitle] = useState(selectedItem.title);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const handleUpdateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(ApiRoutes.UPDATE_TASK(selectedItem._id), {
      method: "PATCH",
      body: JSON.stringify({ title: itemTitle }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    if (response.ok) dispatch(updateTask(jsonResponse));
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
              onClick={handleUpdateTask}
            >
              Save changes
            </button>
          </form>
          <div className="pl-2">
            <li>Title: {selectedItem.title}</li>
            <li>Completed: {selectedItem.completed ? "True" : "False"} </li>
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
