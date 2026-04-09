import {
  IApi,
  LarekProductsResponse,
  LarekOrderRequest,
  LarekOrderResponse,
} from "../../types";

export class ApiLarek {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<LarekProductsResponse> {
    return this.api.get<LarekProductsResponse>("/product/");
  }

  createOrder(data: LarekOrderRequest): Promise<LarekOrderResponse> {
    return this.api.post<LarekOrderResponse>("/order/", data);
  }
}
