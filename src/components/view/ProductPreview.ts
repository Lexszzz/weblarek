import { BaseCard, BaseCardData } from "./BaseCard";
import { categoryMap } from "../../utils/constants";

type ProductPreviewData = {
  image: string;
  category: string;
  description: string;
  buttonText: string;
  isButtonDisabled: boolean;
};

type ProductPreviewActions = {
  onToggle: () => void;
};

export class ProductPreview extends BaseCard<
  BaseCardData & ProductPreviewData
> {
  private imageElement: HTMLImageElement;
  private categoryElement: HTMLElement;
  private descriptionElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ProductPreviewActions) {
    super(container);

    this.imageElement = this.container.querySelector(".card__image")!;
    this.categoryElement = this.container.querySelector(".card__category")!;
    this.descriptionElement = this.container.querySelector(".card__text")!;
    this.buttonElement = this.container.querySelector(".card__button")!;

    this.buttonElement.addEventListener("click", actions.onToggle);
  }

  set image(value: string) {
    this.setImage(this.imageElement, value);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = "card__category";

    const modifier = categoryMap[value as keyof typeof categoryMap];
    if (modifier) {
      this.categoryElement.classList.add(modifier);
    }
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
