import z, { string } from "zod";

export const itemSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: string().trim().min(1, "Description is required"),
  price: z
    .number({ message: "Price must be a valid number" })
    .positive("Price must be greater than 0."),
});

export type CreateItemInput = z.infer<typeof itemSchema>;
export type UpdateItemInput = Partial<CreateItemInput>;

export interface Item extends CreateItemInput {
  id: string;
  createdAt: string;
  updatedAt?: string;
}
