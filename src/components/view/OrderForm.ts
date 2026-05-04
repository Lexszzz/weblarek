import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../base/Events";

export class OrderForm extends BaseForm {
  private paymentButtons: HTMLButtonElement[];
  private addressInput: HTMLInputElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.paymentButtons = Array.from(
      this.container.querySelectorAll(".order__buttons .button"),
    ) as HTMLButtonElement[];

    this.addressInput = this.container.querySelector(
      "input[name='address']",
    ) as HTMLInputElement;

    // обработка выбора оплаты
    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("form:change", {
          field: "payment",
          value: button.name,
        });
      });
    });
  }

  // установка выбранного способа оплаты
  set payment(value: string) {
    this.paymentButtons.forEach((btn) => {
      btn.classList.toggle("button_alt-active", btn.name === value);
    });
  }

  // установка адреса
  set address(value: string) {
    this.addressInput.value = value;
  }
}
