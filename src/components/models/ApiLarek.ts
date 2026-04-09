import { IApi } from "../../types";
import { larekProductsResponse } from "../../types";
import { larekOrderRequest } from "../../types";
import { larekOrderResponse } from "../../types";

export class ApiLarek {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }

  // Получаем список товаров
  getProducts(): Promise<larekProductsResponse> {
    return this.api.get<larekProductsResponse>("/product/");
  }

  // Создаем и отправляем заказ
  createOrder(data: larekOrderRequest): Promise<larekOrderResponse> {
    return this.api.post<larekOrderResponse>("/order/", data);
  }
}
