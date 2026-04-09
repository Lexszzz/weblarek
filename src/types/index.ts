export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type TPayment = "cash" | "card";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface larekProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface larekBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export interface larekProductsResponse {
  items: larekProduct[];
  total: number;
}

export interface larekOrderRequest extends larekBuyer {
  items: string[];
  total: number;
}

export interface larekOrderResponse {
  id: string;
  total: number;
}
