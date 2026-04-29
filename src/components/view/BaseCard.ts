import { Component } from "../base/Component";
import { categoryMap } from "../../utils/constants";

export type BaseCardData = {
  id: string;
  title: string;
  image: string;
  category: string;
  priceLabel: string;
};

export class BaseCard<T extends BaseCardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected priceElement: HTMLElement;

  protected id: string = "";

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = this.container.querySelector(".card__title")!;
    this.imageElement = this.container.querySelector(".card__image")!;
    this.categoryElement = this.container.querySelector(".card__category")!;
    this.priceElement = this.container.querySelector(".card__price")!;
  }

  set idValue(value: string) {
    this.id = value;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
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

  set priceLabel(value: string) {
    this.priceElement.textContent = value;
  }
}
