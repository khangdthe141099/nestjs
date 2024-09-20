import { z } from 'zod';

export const productSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.number().positive(),
  })
  .required();

export const updateProductSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.number().positive(),
  })
  .partial();

export type ProductSchemaDto = z.infer<typeof productSchema>;
export type UpdateProductSchemaDto = z.infer<typeof updateProductSchema>;
