import "./scss/styles.scss";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { ApiLarek } from "./components/models/ApiLarek";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";

import { ProductCard } from "./components/view/ProductCard";
import { ProductPreview } from "./components/view/ProductPreview";
import { Header } from "./components/view/Header";
import { CartView } from "./components/view/CartView";
import { CartItem } from "./components/view/CartItem";
import { OrderForm } from "./components/view/OrderForm";
import { ContactsForm } from "./components/view/ContactsForm";
import { Success } from "./components/view/Success";
import { Modal } from "./components/view/Modal";
import { CatalogView } from "./components/view/CatalogView";

//Инициализация событий
const events = new EventEmitter();

//Инициализация моделей
const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

//Инициализация API
const api = new Api(API_URL);
const apiService = new ApiLarek(api);

//Инициализация шаблонов
const cardCatalogTemplate = document.getElementById(
  "card-catalog",
) as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById(
  "card-preview",
) as HTMLTemplateElement;
const cardBasketTemplate = document.getElementById(
  "card-basket",
) as HTMLTemplateElement;
const basketTemplate = document.getElementById("basket") as HTMLTemplateElement;
const orderTemplate = document.getElementById("order") as HTMLTemplateElement;
const contactsTemplate = document.getElementById(
  "contacts",
) as HTMLTemplateElement;
const successTemplate = document.getElementById(
  "success",
) as HTMLTemplateElement;

const catalogView = new CatalogView(
  document.querySelector(".gallery") as HTMLElement,
);

//Modal + header
const modal = new Modal(
  document.getElementById("modal-container") as HTMLElement,
  events,
);

const header = new Header(
  document.querySelector(".header") as HTMLElement,
  events,
);

const cartView = new CartView(
  basketTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const orderForm = new OrderForm(
  orderTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const contactsForm = new ContactsForm(
  contactsTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const success = new Success(
  successTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const preview = new ProductPreview(
  cardPreviewTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  {
    onToggle: () => events.emit("product:toggle"),
  },
);

//Состояние модального окна
let currentModal: "cart" | "product" | "order" | "contacts" | "success" | null =
  null;

//Загрузка данных
apiService
  .getProducts()
  .then((data) => catalog.setProducts(data.items))
  .catch((err) => console.error(err));

//Отрисовка каталога
events.on("catalog:changed", () => {
  const cards = catalog.getProducts().map((product) => {
    const element = cardCatalogTemplate.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const card = new ProductCard(element, {
      onClick: () => events.emit("product:select", { id: product.id }),
    });

    return card.render({
      title: product.title,
      priceLabel:
        product.price === null ? "Недоступно" : `${product.price} синапсов`,
      image: `${CDN_URL}/${product.image}`,
      category: product.category,
    });
  });

  catalogView.render({ items: cards });
});

//Выбор карточка
events.on("product:select", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (product) catalog.setSelectedProduct(product);
});

//Превью
events.on("product:selected", () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;

  modal.setContent(
    preview.render({
      title: product.title,
      priceLabel:
        product.price === null ? "Недоступно" : `${product.price} синапсов`,
      image: `${CDN_URL}/${product.image}`,
      category: product.category,
      description: product.description,
      buttonText: cart.hasItem(product.id) ? "Удалить из корзины" : "Купить",
      isButtonDisabled: product.price === null,
    }),
  );

  currentModal = "product";
  modal.open();
});

//Переключение Toggle
events.on("product:toggle", () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;

  cart.hasItem(product.id) ? cart.removeItem(product) : cart.addItem(product);

  modal.close();
});

//Отрисовка корзины
function renderCart() {
  const items = cart.getItems();

  const elements = items.map((item, index) => {
    const el = cardBasketTemplate.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const view = new CartItem(el, {
      onDelete: () => events.emit("cart:remove", { id: item.id }),
    });

    return view.render({
      title: item.title,
      priceLabel: `${item.price ?? 0} синапсов`,
      index: index + 1,
    });
  });

  cartView.render({
    items: elements,
    totalLabel: `${cart.getTotalPrice()} синапсов`,
    isCheckoutDisabled: items.length === 0,
  });
}

//События корзины
events.on("cart:changed", () => {
  header.render({ counter: cart.getTotalCount() });
  renderCart();
});

events.on("basket:open", () => {
  renderCart();
  currentModal = "cart";
  modal.setContent(cartView.render());
  modal.open();
});

events.on("cart:remove", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (product) cart.removeItem(product);
});

//Заказ
events.on("order:start", () => {
  currentModal = "order";
  modal.setContent(orderForm.render());
  modal.open();
});

//События формы
events.on(
  "form:change",
  ({ field, value }: { field: string; value: string }) => {
    buyer.setData({ [field]: value });
  },
);

events.on("buyer:changed", () => {
  const data = buyer.getData();
  const errors = buyer.validate();

  // OrderForm
  orderForm.address = data.address;
  orderForm.payment = data.payment ?? "";
  orderForm.isValid = !errors.address && !errors.payment;
  orderForm.errors = errors.address || errors.payment || "";

  // ContactsForm
  contactsForm.email = data.email;
  contactsForm.phone = data.phone;
  contactsForm.isValid = !errors.email && !errors.phone;
  contactsForm.errors = errors.email || errors.phone || "";
});

//Submit
events.on("form:submit", () => {
  if (currentModal === "order") {
    currentModal = "contacts";
    modal.setContent(contactsForm.render());
    modal.open();
    return;
  }

  if (currentModal === "contacts") {
    const order = {
      ...buyer.getData(),
      items: cart.getItems().map((i) => i.id),
      total: cart.getTotalPrice(),
    };

    apiService
      .createOrder(order as any)
      .then((res) => {
        cart.clear();
        buyer.clear();

        const content = success.render({
          totalLabel: `${res.total} синапсов`,
        });

        modal.setContent(content);
        modal.open();

        currentModal = "success";
      })
      .catch((err) => console.error(err));
  }
});

//Закрытие
events.on("success:close", () => {
  modal.close();
});
