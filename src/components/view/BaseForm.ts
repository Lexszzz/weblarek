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
    this.form.addEventListener("input", () => {
      const data = this.getFormData();
      this.events.emit("form:change", data);
    });

    // отправка формы
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this.getFormData();
      this.events.emit("form:submit", data);
    });
  }

  // сбор данных с формы
  protected getFormData(): Record<string, string> {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData.entries()) as Record<string, string>;
  }

  // установка ошибок
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  // управление кнопкой
  set isValid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
