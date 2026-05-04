import { Component } from "../base/Component";

export type BaseCardData = {
  title: string;
  priceLabel: string;
};

export class BaseCard<T extends BaseCardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = this.container.querySelector(".card__title")!;
    this.priceElement = this.container.querySelector(".card__price")!;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set priceLabel(value: string) {
    this.priceElement.textContent = value;
  }
}
