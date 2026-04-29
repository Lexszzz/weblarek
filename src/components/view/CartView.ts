import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

type CartViewData = {
  items: HTMLElement[];
  totalLabel: string;
  isCheckoutDisabled: boolean;
};

export class CartView extends Component<CartViewData> {
  private listElement: HTMLElement;
  private totalElement: HTMLElement;
  private checkoutButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.listElement = this.container.querySelector(".basket__list")!;
    this.totalElement = this.container.querySelector(".basket__price")!;
    this.checkoutButton = this.container.querySelector(".basket__button")!;

    this.checkoutButton.addEventListener("click", () => {
      this.events.emit("order:start");
    });
  }

  set items(elements: HTMLElement[]) {
    this.listElement.replaceChildren(...elements);
  }

  set totalLabel(value: string) {
    this.totalElement.textContent = value;
  }

  set isCheckoutDisabled(value: boolean) {
    this.checkoutButton.disabled = value;
  }
}
