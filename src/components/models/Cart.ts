import { larekProduct } from "../../types";

export class Cart {
  private items: larekProduct[] = [];

  // Получаем товары в корзине
  getItems(): larekProduct[] {
    return this.items;
  }

  // Добавляем товар
  addItem(product: larekProduct): void {
    this.items.push(product);
  }

  // Удаляем товар по id
  removeItem(product: larekProduct): void {
    this.items = this.items.filter((item) => item.id !== product.id);
  }

  // Очищаем корзину
  clear(): void {
    this.items = [];
  }

  // Считаем общуя стоимость
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.price ?? 0);
    }, 0);
  }

  // Считаем количество товаров
  getTotalCount(): number {
    return this.items.length;
  }

  // Проверка наличия товара
  hasItem(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
