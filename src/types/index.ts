export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type TPayment = "cash" | "card";
export type BuyerErrors = Partial<Record<keyof LarekBuyer, string>>;

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface LarekProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface LarekBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export interface LarekOrderRequest extends LarekBuyer {
  items: string[];
  total: number;
}

export interface LarekProductsResponse {
  items: LarekProduct[];
  total: number;
}

export interface LarekOrderResponse {
  id: string;
  total: number;
}
