import { LarekProduct } from "../../types";

export class Catalog {
  private products: LarekProduct[] = [];
  private selectedProduct: LarekProduct | null = null;

  setProducts(products: LarekProduct[]): void {
    this.products = products;
  }

  getProducts(): LarekProduct[] {
    return this.products;
  }

  getProductById(id: string): LarekProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: LarekProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): LarekProduct | null {
    return this.selectedProduct;
  }
}
