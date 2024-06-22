import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().positive().optional(),
});

export default userSchema;
