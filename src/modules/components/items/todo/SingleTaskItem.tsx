import React from "react";
import { ITask } from "../../../utils/items";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface ISingleTaskItemProps {
  task: ITask;
  checkTask: (task: ITask) => void;
  openModal: (task: ITask) => void;
  handleDeleteTask: (task: ITask) => void;
}

const SingleTaskItem: React.FC<ISingleTaskItemProps> = ({
  task,
  checkTask,
  openModal,
  handleDeleteTask,
}) => {
  return (
    <div
      key={task._id}
      className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around"
    >
      <div className="w-full text-left flex items-center gap-2">
        <input
          className="cursor-pointer"
          title="Completed?"
          onChange={() => checkTask(task)}
          type="checkbox"
          checked={task.completed || false}
        />
        <div className="text-white w-full">{task.title}</div>
      </div>
      <div className="text-white w-1/5 flex gap-2 justify-end text-xl">
        <button onClick={() => openModal(task)}>
          <BiSolidEdit title="Edit" />
        </button>
        <button onClick={() => handleDeleteTask(task)}>
          <MdDelete title="Delete?" />
        </button>
      </div>
    </div>
  );
};

export default SingleTaskItem;
