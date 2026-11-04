import { z } from 'zod';

export const UserRoleSchema = z.enum(['user', 'admin']);

export const UserStatusSchema = z.enum([
  'active',
  'inactive',
  'banned',
]);

export const CreateUserSchema = z.object({
  username: z.string().min(1).max(24),

  username_normalized: z.string().min(1).max(24),

  phone: z.string().regex(/^09\d{9}$/, 'شماره تلفن معتبر نیست'),

  password: z.string().min(8).max(128),

  role: UserRoleSchema.default('user'),

  status: UserStatusSchema.default('active'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;