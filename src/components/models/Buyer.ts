import { LarekBuyer, BuyerErrors } from "../../types";
import { EventEmitter } from "../base/Events";

export class Buyer {
  private data: LarekBuyer = {
    payment: null,
    email: "",
    phone: "",
    address: "",
  };

  constructor(private events: EventEmitter) {}

  setData(data: Partial<LarekBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };

    this.events.emit("buyer:changed", { data: this.data });
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

    this.events.emit("buyer:changed", { data: this.data });
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
