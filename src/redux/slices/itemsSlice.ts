import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../modules/utils/items";

interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload._id);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((i) => {
        if (i._id === action.payload._id) {
          return action.payload;
        }
        return i;
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  setTasks,
  deleteTask,
  updateTask,
  setError,
  setLoading,
} = taskSlice.actions;
export default taskSlice.reducer;
