export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
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
