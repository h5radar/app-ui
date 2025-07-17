import { z } from "zod";

export const maturitiesSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, { message: "Title must be at least 3 characters" })
    .max(64, { message: "Title must be less than 64 characters" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 3 characters" })
    .max(512, { message: "Description must be less than 512 characters" }),
  position: z
    .number()
    .min(0, { message: "Moved must be greater or equal than -1" })
    .max(3, { message: "Moved must be less or equal than 1" }),
  color: z
    .string()
    .min(1, { message: "Title must be at least 3 characters" })
    .max(64, { message: "Title must be less than 64 characters" }),
});
