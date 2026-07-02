export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
}
export interface CreateItemInput {
  name: string;
  description: string;
  price: number;
}
export interface UpdateItemInput {
  name?: string;
  description?: string;
  price?: number;
}
