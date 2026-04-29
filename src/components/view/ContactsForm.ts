import { BaseForm } from "./BaseForm";
import { EventEmitter } from "../base/Events";

export class ContactsForm extends BaseForm {
  constructor(container: HTMLElement, events: EventEmitter) {
    super(container, events);
  }
}
