import React from "react";
import { MdDelete } from "react-icons/md";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../redux/slices/itemsSlice";
import { ApiRoutes } from "../../../utils/proxy";
import { ITask } from "../../../utils/items";

const CompletedTasks = ({}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleDeleteTask = async (item: ITask) => {
    const res = await fetch(ApiRoutes.DELETE_TASK(item._id), {
      method: "DELETE",
    });
    const jsonRes = await res.json();
    dispatch(deleteTask(jsonRes));
  };

  const isCompleted = tasks.filter((task) => task.completed === true);

  return (
    <div className="flex items-center w-full flex-col overflow-auto">
      {isCompleted.length === 0 ? (
        <>
          <div className=" text-black text-xl">No completed tasks</div>
        </>
      ) : (
        <>
          {isCompleted.map((item) => (
            <div
              key={item._id}
              className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around item.completed text-white
          "
            >
              <div className="w-full text-left flex gap-2">
                <div>{item.title}</div>
                {/* {item.completedOn && (
              <div>
                <small>
                  <i>Completed on {item.completedOn}</i>
                </small>
              </div>
            )} */}
              </div>
              <div className=" w-1/5 flex gap-2 justify-end text-xl">
                <button
                  onClick={() => handleDeleteTask(item)}
                  className="text-white "
                >
                  <MdDelete className="p-0 hover:text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CompletedTasks;
