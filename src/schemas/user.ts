import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  id: z.string().uuid(),
  level: z.number().gt(1),
});

export type userType = z.infer<typeof userSchema>;
