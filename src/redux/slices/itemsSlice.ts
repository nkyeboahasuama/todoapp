import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../modules/utils/items";

const initialState: ITask[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      return action.payload;
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      return [action.payload, ...state];
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      return state.filter((t) => t._id !== action.payload._id);
    },
    updateTask: (state, action) => {
      return state.map((i) => {
        if (i._id === action.payload._id) {
          return action.payload;
        }
        return i;
      });
    },
  },
});

export const { addTask, setTasks, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
