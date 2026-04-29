import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

type CartItemData = {
  id: string;
  title: string;
  priceLabel: string;
  index: number;
};

export class CartItem extends Component<CartItemData> {
  private titleElement: HTMLElement;
  private priceElement: HTMLElement;
  private indexElement: HTMLElement;
  private deleteButton: HTMLButtonElement;

  private id: string = "";

  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.titleElement = this.container.querySelector(".card__title")!;
    this.priceElement = this.container.querySelector(".card__price")!;
    this.indexElement = this.container.querySelector(".basket__item-index")!;
    this.deleteButton = this.container.querySelector(".basket__item-delete")!;

    this.deleteButton.addEventListener("click", () => {
      this.events.emit("cart:remove", { id: this.id });
    });
  }

  set idValue(value: string) {
    this.id = value;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set priceLabel(value: string) {
    this.priceElement.textContent = value;
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
