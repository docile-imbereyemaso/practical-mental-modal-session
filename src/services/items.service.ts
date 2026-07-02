import type {
  CreateItemInput,
  Item,
  UpdateItemInput,
} from "../types/items.interface.js";
import { readData, writeData } from "../utils/fileHandler.js";
import { v4 as uuid } from "uuid";

export const getAllItemsService = async (): Promise<Item[]> => {
  return await readData();
};
export const getItemByIdService = async (id: string): Promise<Item | null> => {
  const items: Item[] = await readData();
  const item = items.find((item: Item) => item.id === id);
  return item || null;
};
export const createItemService = async (
  item: CreateItemInput,
): Promise<Item> => {
  const items = await readData();
  const newItem: Item = {
    id: uuid(),
    name: item.name.trim(),
    description: item.description.trim(),
    price: Number(item.price),
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  await writeData(items);
  return newItem;
};
export const updateItemService = async (
  id: string,
  input: UpdateItemInput,
): Promise<Item | null> => {
  const items: Item[] = await readData();
  const index = items.findIndex((item: Item) => item.id === id);
  if (index === -1) return null;
  const currentItem = items[index];
  if (!currentItem) return null;
  const updatedItem = {
    ...currentItem,
    name: input.name !== undefined ? input.name.trim() : currentItem.name,
    description:
      input.description !== undefined
        ? input.description.trim()
        : currentItem.description,
    price: input.price !== undefined ? Number(input.price) : currentItem.price,
    updatedAt: new Date().toISOString(),
  };
  items[index] = updatedItem;
  await writeData(items);
  return updatedItem;
};
export const deleteItemService = async (id: string): Promise<boolean> => {
  const items: Item[] = await readData();
  const index = items.findIndex((item: Item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  await writeData(items);
  return true;
};
