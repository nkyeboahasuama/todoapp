import React, { useEffect } from "react";
import ItemModal from "../../../modal/ItemModal";
import { useState } from "react";
import { ITask } from "../../../utils/items";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { ApiRoutes } from "../../../utils/proxy";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  setTasks,
  deleteTask,
  updateTask,
} from "../../../../redux/slices/itemsSlice";

const TodoItems = () => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ITask | null>(null);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch(ApiRoutes.TASKS);
      const jsonRes = await res.json();

      if (res.ok) {
        dispatch(setTasks(jsonRes));
      }
    };
    getTasks();
  }, []);

  const isNotCompleted = tasks.filter((task) => task.completed === false);

  const openModal = (item: ITask) => {
    setModal(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleDeleteTask = async (item: ITask) => {
    const res = await fetch(ApiRoutes.DELETE_TASK(item._id), {
      method: "DELETE",
    });
    const jsonRes = await res.json();
    dispatch(deleteTask(jsonRes));
  };

  const checkTask = async (task: ITask) => {
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const updatedCompleted = { ...task, completed: true };
    const response = await fetch(ApiRoutes.UPDATE_TASK(task._id), {
      method: "PATCH",
      body: JSON.stringify(updatedCompleted),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    response.ok && dispatch(updateTask(jsonResponse));
  };

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        {isNotCompleted &&
          isNotCompleted.map((item, index) => (
            <div
              key={index}
              className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around"
            >
              <div className="w-full text-left flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  title="Completed?"
                  onChange={() => checkTask(item)}
                  type="checkbox"
                  checked={item.completed || false}
                />
                <div className="text-white w-full">{item.title}</div>
              </div>
              <div className="text-white w-1/5 flex gap-2 justify-end text-xl">
                <button onClick={() => openModal(item)}>
                  <BiSolidEdit title="Edit" />
                </button>
                <button onClick={() => handleDeleteTask(item)}>
                  <MdDelete title="Delete?" />
                </button>
              </div>
            </div>
          ))}
      </div>
      {modal && selectedItem && (
        <ItemModal selectedItem={selectedItem} closeModal={closeModal} />
      )}
    </>
  );
};

export default TodoItems;
