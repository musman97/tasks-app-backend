import { Task } from 'src/v1/entities';
import { TaskId, Tasks } from '../task.types';
import { Nullable } from 'src/common';

export class TaskDto {
  id: TaskId;
  title: string;
  description: Nullable<string>;
  status: string;
  dueDate: Nullable<Task['dueDate']>;
  createdAt: Task['createdAt'];
  updatedAt: Task['updatedAt'];

  static from(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
  static fromList(tasks: Tasks): TaskDto[] {
    return tasks.map((task) => this.from(task));
  }
}
