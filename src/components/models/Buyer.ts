import { LarekBuyer, BuyerErrors } from "../../types";

export class Buyer {
  private data: LarekBuyer = {
    payment: null,
    email: "",
    phone: "",
    address: "",
  };

  setData(data: Partial<LarekBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };
  }

  getData(): LarekBuyer {
    return this.data;
  }

  clear(): void {
    this.data = {
      payment: null,
      email: "",
      phone: "",
      address: "",
    };
  }

  validate(): BuyerErrors {
    const errors: BuyerErrors = {};

    if (!this.data.payment) {
      errors.payment = "Не выбран вид оплаты";
    }

    if (!this.data.email) {
      errors.email = "Укажите email";
    }

    if (!this.data.phone) {
      errors.phone = "Укажите телефон";
    }

    if (!this.data.address) {
      errors.address = "Укажите адрес";
    }

    return errors;
  }
}
