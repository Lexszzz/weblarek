import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../base/Events";

export class OrderForm extends BaseForm {
  private paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.paymentButtons = Array.from(
      this.container.querySelectorAll(".order__buttons .button"),
    ) as HTMLButtonElement[];

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // снимаем выделение со всех кнопок
        this.paymentButtons.forEach((btn) =>
          btn.classList.remove("button_alt-active"),
        );

        // выделяем текущую
        button.classList.add("button_alt-active");

        // отправляем событие изменения формы
        this.events.emit("form:change", {
          payment: button.name,
        });
      });
    });
  }
}
