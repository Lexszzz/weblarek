import { BaseCard, BaseCardData } from "./BaseCard";

type CartItemData = BaseCardData & {
  index: number;
};

type CartItemActions = {
  onDelete: () => void;
};

export class CartItem extends BaseCard<CartItemData> {
  private indexElement: HTMLElement;
  private deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: CartItemActions) {
    super(container);

    this.indexElement = this.container.querySelector(".basket__item-index")!;
    this.deleteButton = this.container.querySelector(".basket__item-delete")!;

    this.deleteButton.addEventListener("click", actions.onDelete);
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
