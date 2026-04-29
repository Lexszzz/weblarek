import { LarekProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Cart {
  private items: LarekProduct[] = [];

  constructor(private events: EventEmitter) {}

  getItems(): LarekProduct[] {
    return this.items;
  }

  addItem(product: LarekProduct): void {
    this.items.push(product);
    this.events.emit("cart:changed", { items: this.items });
  }

  removeItem(product: LarekProduct): void {
    this.items = this.items.filter((item) => item.id !== product.id);
    this.events.emit("cart:changed", { items: this.items });
  }

  clear(): void {
    this.items = [];
    this.events.emit("cart:changed", { items: this.items });
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.price ?? 0);
    }, 0);
  }

  getTotalCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
