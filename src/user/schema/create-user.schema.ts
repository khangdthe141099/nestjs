import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  avatarUrl: z.string().url().optional(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long',
    }),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  avatarUrl: z.string().url().optional(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long',
    }),
});

export type CreateUserSchemaDTO = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaDTO = z.infer<typeof updateUserSchema>;
