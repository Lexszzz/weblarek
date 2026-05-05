import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class Modal extends Component<void> {
  private closeButton: HTMLButtonElement;
  private contentElement: HTMLElement;

  constructor(
    container: HTMLElement,
    private events: EventEmitter,
  ) {
    super(container);

    this.closeButton = this.container.querySelector(".modal__close")!;
    this.contentElement = this.container.querySelector(".modal__content")!;

    // закрытие по крестику
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    // закрытие по клику вне контента
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }

  setContent(node: HTMLElement) {
    this.contentElement.replaceChildren(node);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
    this.events.emit("modal:close");
  }
}