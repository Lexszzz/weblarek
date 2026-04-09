import { LarekProduct } from "../../types";

export class Cart {
  private items: LarekProduct[] = [];

  getItems(): LarekProduct[] {
    return this.items;
  }

  addItem(product: LarekProduct): void {
    this.items.push(product);
  }

  removeItem(product: LarekProduct): void {
    this.items = this.items.filter((item) => item.id !== product.id);
  }

  clear(): void {
    this.items = [];
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
