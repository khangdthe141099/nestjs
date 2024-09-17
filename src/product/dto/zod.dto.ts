import { z } from 'zod';

export const productSchema = z
  .object({
    name: z.string().min(2, 'Name must be greater than or equal to 2 characters'),
    desc: z.string().min(5),
    price: z.number().positive(),
  })
  .required();

export type ProductSchemaDto = z.infer<typeof productSchema>;
