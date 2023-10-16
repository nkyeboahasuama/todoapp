const baseUrl = "http://localhost:4000/api/tasks";

export const ApiRoutes = {
  TASKS: baseUrl,
  ADD_TASK: `${baseUrl}/`,
  UPDATE_TASK: (id: string) => `${baseUrl}/${id}`,
  DELETE_TASK: (id: string) => `${baseUrl}/${id}`,
};
