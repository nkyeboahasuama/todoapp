import React from "react";
import ItemModal from "../../../modal/ItemModal";
import { useState } from "react";
import { ITodoTypes } from "../../../utils/items";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface ITodoItemsProps {
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
  isNotCompleted: ITodoTypes[];
  itemsArray: ITodoTypes[];
}

const TodoItems: React.FC<ITodoItemsProps> = ({
  setItemsArray,
  itemsArray,
  isNotCompleted,
}) => {
  const [modal, setModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState<ITodoTypes | null>(null);

  const openModal = (item: ITodoTypes) => {
    setModal(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };

  const editTask = (newItem: ITodoTypes) => {
    const newArray = isNotCompleted.map((i) => {
      if (i.id === newItem.id) {
        return newItem;
      }
      return i;
    });
    setItemsArray(newArray);
  };

  const deleteTask = (item: ITodoTypes) => {
    const newTasks = isNotCompleted.filter((i) => i.id !== item.id);
    setItemsArray(newTasks);
  };

  const checkTask = (item: ITodoTypes) => {
    const newCompleted = itemsArray.map((todo) => {
      if (item.id === todo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setItemsArray(newCompleted);
  };

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        {isNotCompleted.map((item) => (
          <div
            key={item.id}
            className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around"
          >
            <div className="w-full text-left flex items-center gap-2">
              <input
                onChange={() => checkTask(item)}
                type="checkbox"
                checked={item.completed || false}
              />
              <div className="text-white w-full">{item.title}</div>
            </div>
            <div className="text-white w-1/5 flex gap-2 justify-end text-xl">
              <button onClick={() => openModal(item)}>
                <BiSolidEdit />
              </button>
              <button onClick={() => deleteTask(item)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && selectedItem && (
        <ItemModal
          selectedItem={selectedItem}
          closeModal={closeModal}
          editTask={editTask}
        />
      )}
    </>
  );
};

export default TodoItems;
