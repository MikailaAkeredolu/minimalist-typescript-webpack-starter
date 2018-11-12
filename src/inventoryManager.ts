import { Item } from "./item";

export interface InventoryManager {
    setModel(productList: any[]): void
}

//declaring custom type
export type InventoryCallback = (item: Item) => void;
