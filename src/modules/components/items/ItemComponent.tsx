import React from "react";
import { todos } from "../../utils/items";
import ItemModal from "../../modal/ItemModal";
import { useState } from "react";
import { ITodoTypes } from "../../utils/items";

const ItemComponent = () => {
  const [modal, setModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ITodoTypes | null>(null);

  const openModal = (item: ITodoTypes) => {
    setModal(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };

  const checked = (item: ITodoTypes) => {
    console.log("checked", item);
    todos.map((todo) => {
      if (item.id === todo.id) {
        setCompleted(!completed);
        console.log("same");
        console.log({ ...item, completed: completed });
        return { ...item, completed: completed };
      }
      return todos;
    });
  };

  return (
    <>
      <div className="flex items-center flex-col">
        {todos.map((item) => (
          <div
            key={item.id}
            className="h-16 text-center w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around"
          >
            <div className="w-3/5 text-left flex gap-2">
              <input onChange={() => checked(item)} type="checkbox" />
              {item.completed ? (
                <div className="text-white">{item.title}</div>
              ) : (
                <div>{item.title}</div>
              )}
            </div>
            <button
              onClick={() => openModal(item)}
              className="bg-blue-500 w-20"
            >
              open
            </button>
          </div>
        ))}
      </div>
      {modal && selectedItem && (
        <ItemModal selectedItem={selectedItem} closeModal={closeModal} />
      )}
    </>
  );
};

export default ItemComponent;
