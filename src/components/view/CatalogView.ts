import { Component } from "../base/Component";

type CatalogViewData = {
  items: HTMLElement[];
};

export class CatalogView extends Component<CatalogViewData> {
  constructor(container: HTMLElement) {
    super(container);
  }

  set items(value: HTMLElement[]) {
    this.container.replaceChildren(...value);
  }
}
