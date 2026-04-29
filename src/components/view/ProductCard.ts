import { BaseCard } from "./BaseCard";
import { EventEmitter } from "../base/Events";
import { BaseCardData } from "./BaseCard";

export class ProductCard extends BaseCard<BaseCardData> {
  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.container.addEventListener("click", () => {
      this.events.emit("product:select", { id: this.id });
    });
  }
}
