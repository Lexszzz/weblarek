import { larekProduct } from "../../types";

export class Catalog {
  private products: larekProduct[] = [];
  private selectedProduct: larekProduct | null = null;

  // Сохраняем массив товаров
  setProducts(products: larekProduct[]): void {
    this.products = products;
  }

  // Получаем все товары
  getProducts(): larekProduct[] {
    return this.products;
  }

  // Получаем товар по id
  getProductById(id: string): larekProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  // Сохраняем выбранный товар
  setSelectedProduct(product: larekProduct): void {
    this.selectedProduct = product;
  }

  // Получаем выбранный товар
  getSelectedProduct(): larekProduct | null {
    return this.selectedProduct;
  }
}
