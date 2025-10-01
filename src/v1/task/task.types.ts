import { EnumType } from 'src/common';
import { Task } from '../entities';

export type TaskId = Task['id'];
export type Tasks = Task[];

type SortableTaskKeys = keyof Pick<
  Task,
  'title' | 'dueDate' | 'status' | 'createdAt' | 'updatedAt'
>;
export const SortableTaskFields: Record<SortableTaskKeys, SortableTaskKeys> = {
  title: 'title',
  dueDate: 'dueDate',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};
export type SortableTaskField = EnumType<typeof SortableTaskFields>;
