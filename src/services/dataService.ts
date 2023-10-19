import { ApiRoutes } from "../modules/utils/proxy";
import {
  setTasks,
  deleteTask,
  updateTask,
  setLoading,
  setError,
  addTask,
} from "../redux/slices/itemsSlice";
import { ITask } from "../modules/utils/items";
import { AppDispatch } from "../redux/store";

class DataService {
  async fetchTasks(dispatch: AppDispatch) {
    dispatch(setLoading(true));
    try {
      const res = await fetch(ApiRoutes.TASKS);
      const jsonRes = await res.json();

      if (res.ok) {
        dispatch(setTasks(jsonRes));
      }
    } catch (error) {
      dispatch(setError("Network issue"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async addTask(newTask: any, dispatch: AppDispatch) {
    const response = await fetch(ApiRoutes.ADD_TASK, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    if (response.ok) {
      dispatch(addTask(jsonResponse));
    }
  }

  async updateTaskTitle(
    selectedItem: ITask,
    newTitle: string,
    dispatch: AppDispatch
  ) {
    const response = await fetch(ApiRoutes.UPDATE_TASK(selectedItem._id), {
      method: "PATCH",
      body: JSON.stringify({ title: newTitle }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    if (response.ok) dispatch(updateTask(jsonResponse));
  }
  async deleteTaskFromApi(item: ITask, dispatch: AppDispatch) {
    const res = await fetch(ApiRoutes.DELETE_TASK(item._id), {
      method: "DELETE",
    });
    const jsonRes = await res.json();
    dispatch(deleteTask(jsonRes));
  }

  async markTaskAsCompleted(task: ITask, dispatch: AppDispatch) {
    const response = await fetch(ApiRoutes.UPDATE_TASK(task._id), {
      method: "PATCH",
      body: JSON.stringify({ ...task, completed: true }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    response.ok && dispatch(updateTask(jsonResponse));
  }
}
const dataService = new DataService();
export default dataService;
