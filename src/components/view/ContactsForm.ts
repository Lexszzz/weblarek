import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../base/Events";

export class ContactsForm extends BaseForm {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);

    this.emailInput = this.container.querySelector(
      "input[name='email']",
    ) as HTMLInputElement;

    this.phoneInput = this.container.querySelector(
      "input[name='phone']",
    ) as HTMLInputElement;
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
