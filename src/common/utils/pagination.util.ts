import { DEFAULT_REOURCE_LIMIT } from '../constants';
import { PaginationMeta } from '../interfaces';
import { PaginationInfo } from '../types';

export const createPaginationMeta = (
  totalItems: number,
  page: number = 1,
  limit = DEFAULT_REOURCE_LIMIT,
): PaginationMeta => ({
  page,
  totalPages: Math.ceil(totalItems / limit),
  limit,
  total: totalItems,
});

export const calculateSkip = (page: number, limit: number) =>
  (page - 1) * limit;

export const createPaginationInfo = (
  page: number,
  limit: number,
): PaginationInfo => ({ limit, skip: calculateSkip(page, limit) });
