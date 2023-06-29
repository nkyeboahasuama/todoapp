import React from "react";
import { ITodoTypes } from "../../../utils/items";
import { MdDelete } from "react-icons/md";

interface IIsCompletedProps {
  itemsArray: ITodoTypes[];
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
}

const CompletedItems: React.FC<IIsCompletedProps> = ({
  itemsArray,
  setItemsArray,
}) => {
  const isCompleted = itemsArray.filter((task) => task.completed === true);

  const deleteTask = (item: ITodoTypes) => {
    const newTasks = itemsArray.filter((i) => i.id !== item.id);
    setItemsArray(newTasks);
  };

  return (
    <div className="flex items-center w-full flex-col overflow-auto">
      {isCompleted.map((item) => (
        <div
          key={item.id}
          className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around item.completed text-gray-700
          "
        >
          <div className="w-full text-left flex gap-2">
            <div className="text-gray-700">{item.title}</div>
          </div>
          <div className=" w-1/5 flex gap-2 justify-end text-xl">
            <button onClick={() => deleteTask(item)} className="text-white ">
              <MdDelete className="p-0 hover:text-gray-300" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedItems;
