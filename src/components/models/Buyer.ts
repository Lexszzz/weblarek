import { larekBuyer } from "../../types";

type BuyerErrors = Partial<Record<keyof larekBuyer, string>>;

export class Buyer {
  private data: Partial<larekBuyer> = {};

  setData(data: Partial<larekBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };
  }

  getData(): Partial<larekBuyer> {
    return this.data;
  }

  clear(): void {
    this.data = {};
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
