import { IApi } from "../../types";
import { larekProductsResponse } from "../../types";
import { larekOrderRequest } from "../../types";
import { larekOrderResponse } from "../../types";

export class ApiLarek {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<larekProductsResponse> {
    return this.api.get<larekProductsResponse>("/product/");
  }

  createOrder(data: larekOrderRequest): Promise<larekOrderResponse> {
    return this.api.post<larekOrderResponse>("/order/", data);
  }
}
