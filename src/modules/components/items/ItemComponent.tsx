import React from "react";
import ItemModal from "../../modal/ItemModal";
import { useState } from "react";
import { ITodoTypes } from "../../utils/items";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface IItemComponentProps {
  itemsArray: ITodoTypes[];
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
}

const ItemComponent: React.FC<IItemComponentProps> = ({
  itemsArray,
  setItemsArray,
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
    const newArray = itemsArray.map((i) => {
      if (i.id === newItem.id) {
        return newItem;
      }
      return i;
    });
    setItemsArray(newArray);
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

  const deleteTask = (item: ITodoTypes) => {
    const newTasks = itemsArray.filter((i) => i.id !== item.id);
    setItemsArray(newTasks);
  };

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        {itemsArray.map((item) => (
          <div
            key={item.id}
            className={`h-16 text-center w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around  ${
              item.completed && "line-through text-gray-700"
            }`}
          >
            <div className="w-3/5 text-left flex gap-2">
              <input
                onChange={() => checkTask(item)}
                type="checkbox"
                checked={item.completed || false}
              />
              {item.completed ? (
                <div className="text-gray-700">{item.title}</div>
              ) : (
                <div className="text-white">{item.title}</div>
              )}
            </div>
            <div className=" w-1/5 flex gap-2 justify-end text-xl">
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

export default ItemComponent;
