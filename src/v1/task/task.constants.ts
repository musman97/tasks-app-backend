export const TaskRoutes = {
  base: 'task',
  byId: ':id',
} as const;

export const ERR_MESSAGE_NO_TASK_EXISTS = 'No task exists with the given id';
