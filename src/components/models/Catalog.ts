import { larekProduct } from "../../types";

export class Catalog {
  private products: larekProduct[] = [];
  private selectedProduct: larekProduct | null = null;

  setProducts(products: larekProduct[]): void {
    this.products = products;
  }

  getProducts(): larekProduct[] {
    return this.products;
  }

  getProductById(id: string): larekProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: larekProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): larekProduct | null {
    return this.selectedProduct;
  }
}
