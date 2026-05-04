import { BaseCard, BaseCardData } from "./BaseCard";
import { categoryMap } from "../../utils/constants";

type ProductCardData = BaseCardData & {
  image: string;
  category: string;
};

type ProductCardActions = {
  onClick: () => void;
};

export class ProductCard extends BaseCard<ProductCardData> {
  private imageElement: HTMLImageElement;
  private categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions: ProductCardActions) {
    super(container);

    this.imageElement = this.container.querySelector(".card__image")!;
    this.categoryElement = this.container.querySelector(".card__category")!;

    this.container.addEventListener("click", actions.onClick);
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
}
