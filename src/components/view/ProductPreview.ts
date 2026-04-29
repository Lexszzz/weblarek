import { BaseCard } from "./BaseCard";
import { EventEmitter } from "../base/Events";

type ProductPreviewData = {
  id: string;
  title: string;
  image: string;
  category: string;
  priceLabel: string;
  description: string;
  buttonText: string;
  isButtonDisabled: boolean;
};

export class ProductPreview extends BaseCard<ProductPreviewData> {
  private descriptionElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.descriptionElement = this.container.querySelector(".card__text")!;
    this.buttonElement = this.container.querySelector(".card__button")!;

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("product:toggle", { id: this.id });
    });
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set isButtonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
