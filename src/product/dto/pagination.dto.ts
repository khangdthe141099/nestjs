import { z } from 'zod';

export const paginationSchema = z
  .object({
    skip: z.number().positive(),
    limit: z.number().positive(),
  })
  .optional();

export type PaginationSchemaDTO = z.infer<typeof paginationSchema>;
