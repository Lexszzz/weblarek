import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

type SuccessData = {
  totalLabel: string;
};

export class Success extends Component<SuccessData> {
  private descriptionElement: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.descriptionElement = this.container.querySelector(
      ".order-success__description",
    )!;
    this.closeButton = this.container.querySelector(".order-success__close")!;

    this.closeButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set totalLabel(value: string) {
    this.descriptionElement.textContent = `Списано ${value}`;
  }
}
