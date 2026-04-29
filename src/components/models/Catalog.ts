import { LarekProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Catalog {
  private products: LarekProduct[] = [];
  private selectedProduct: LarekProduct | null = null;

  constructor(private events: EventEmitter) {}

  setProducts(products: LarekProduct[]): void {
    this.products = products;
    this.events.emit("catalog:changed", { products: this.products });
  }

  getProducts(): LarekProduct[] {
    return this.products;
  }

  getProductById(id: string): LarekProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: LarekProduct): void {
    this.selectedProduct = product;
    this.events.emit("product:selected", { product });
  }

  getSelectedProduct(): LarekProduct | null {
    return this.selectedProduct;
  }
}
