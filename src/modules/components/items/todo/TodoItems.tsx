import { useEffect, useState } from "react";
import { ITask } from "../../../utils/items";
import SingleTaskItem from "./SingleTaskItem";
import ItemModal from "../../../modal/ItemModal";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import dataService from "../../../../services/dataService";
const TodoItems = () => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ITask | null>(null);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dataService.fetchTasks(dispatch);
  }, [dispatch]);

  const openModal = (item: ITask) => {
    setModal(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleDeleteTask = async (item: ITask) => {
    dataService.deleteTaskFromApi(item, dispatch);
  };

  const checkTask = async (task: ITask) => {
    dataService.markTaskAsCompleted(task, dispatch);
  };

  if (loading) {
    return <div className="text-black text-xl">Loading...</div>;
  } else if (error) {
    return <div className="text-black text-xl">{error}</div>;
  }

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        {tasks ? (
          tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <SingleTaskItem
                key={task._id}
                task={task}
                checkTask={checkTask}
                openModal={openModal}
                handleDeleteTask={handleDeleteTask}
              />
            ))
        ) : (
          <div>No tasks available</div>
        )}
      </div>
      {modal && selectedItem && (
        <ItemModal selectedItem={selectedItem} closeModal={closeModal} />
      )}
    </>
  );
};

export default TodoItems;
