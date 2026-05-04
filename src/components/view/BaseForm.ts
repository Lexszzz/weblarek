import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class BaseForm extends Component<Record<string, string>> {
  protected form: HTMLFormElement;
  protected errorsElement: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: EventEmitter,
  ) {
    super(container);

    this.form = this.container as HTMLFormElement;
    this.errorsElement = this.form.querySelector(".form__errors")!;
    this.submitButton = this.form.querySelector("button[type='submit']")!;

    // ввод данных
    this.form.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (!target.name) return;

      this.events.emit("form:change", {
        field: target.name,
        value: target.value,
      });
    });

    // отправка формы
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.events.emit("form:submit");
    });
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  set isValid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
