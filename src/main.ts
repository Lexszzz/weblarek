import "./scss/styles.scss";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { ApiLarek } from "./components/models/ApiLarek";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { ProductCard } from "./components/view/ProductCard";
import { CDN_URL } from "./utils/constants";
import { Modal } from "./components/view/Modal";
import { ProductPreview } from "./components/view/ProductPreview";
import { Header } from "./components/view/Header";
import { CartView } from "./components/view/CartView";
import { CartItem } from "./components/view/CartItem";
import { OrderForm } from "./components/view/OrderForm";
import { ContactsForm } from "./components/view/ContactsForm";
import { Success } from "./components/view/Success";

// Инициализация событий
const events = new EventEmitter();

// Инициализация моделей
const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// Инициализация API
const api = new Api(API_URL);
const apiService = new ApiLarek(api);

//получение каталога
const gallery = document.querySelector(".gallery") as HTMLElement;

// Загрузка данных
apiService
  .getProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch((err) => {
    console.error("Ошибка запроса:", err);
  });

events.on("catalog:changed", () => {
  const products = catalog.getProducts();

  const cards = products.map((product) => {
    const template = document.getElementById(
      "card-catalog",
    ) as HTMLTemplateElement;

    const element = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const card = new ProductCard(element, events);

    card.render({
      id: product.id,
      title: product.title,
      image: `${CDN_URL}/${product.image}`,
      category: product.category,
      priceLabel:
        product.price === null ? "Недоступно" : `${product.price} синапсов`,
    });

    return card.render();
  });

  gallery.replaceChildren(...cards);
});

//модальное окно
const modalContainer = document.getElementById(
  "modal-container",
) as HTMLElement;
const modal = new Modal(modalContainer, events);

//состояние модального окна
let currentModal: "cart" | "product" | "order" | "contacts" | "success" | null =
  null;

//функция рендера корзины
function renderCart(cartView: CartView) {
  const items = cart.getItems();

  const elements = items.map((item, index) => {
    const template = document.getElementById(
      "card-basket",
    ) as HTMLTemplateElement;

    const el = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const view = new CartItem(el, events);

    view.render({
      id: item.id,
      title: item.title,
      priceLabel: `${item.price ?? 0} синапсов`,
      index: index + 1,
    });

    return view.render();
  });

  cartView.render({
    items: elements,
    totalLabel: `${cart.getTotalPrice()} синапсов`,
    isCheckoutDisabled: items.length === 0,
  });
}

//обработка кликов
events.on("product:select", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (!product) return;

  catalog.setSelectedProduct(product);
});

events.on("product:selected", () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;

  const template = document.getElementById(
    "card-preview",
  ) as HTMLTemplateElement;

  const element = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;

  const preview = new ProductPreview(element, events);

  preview.render({
    id: product.id,
    title: product.title,
    image: `${CDN_URL}/${product.image}`,
    category: product.category,
    priceLabel:
      product.price === null ? "Недоступно" : `${product.price} синапсов`,
    description: product.description,
    buttonText: cart.hasItem(product.id) ? "Удалить из корзины" : "Купить",
    isButtonDisabled: product.price === null,
  });
  currentModal = "product";
  modal.setContent(preview.render());
  modal.open();
});

//
events.on("product:toggle", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (!product) return;

  if (cart.hasItem(id)) {
    cart.removeItem(product);
  } else {
    cart.addItem(product);
  }

  modal.close();
});

//счетчик в шапке
const headerContainer = document.querySelector(".header") as HTMLElement;
const header = new Header(headerContainer, events);

events.on("cart:changed", () => {
  header.render({
    counter: cart.getTotalCount(),
  });

  //обновляем корзину ТОЛЬКО если она открыта
  if (currentModal === "cart") {
    const content = modalContainer.querySelector(".basket");
    if (content) {
      const cartView = new CartView(content as HTMLElement, events);
      renderCart(cartView);
    }
  }
});

//открытие корзины
events.on("basket:open", () => {
  const template = document.getElementById("basket") as HTMLTemplateElement;

  const element = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;

  const cartView = new CartView(element, events);

  renderCart(cartView);
  currentModal = "cart";
  modal.setContent(cartView.render());
  modal.open();
});

//удаление из корзины
events.on("cart:remove", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (!product) return;

  cart.removeItem(product);
});

//оформление заказа
events.on("order:start", () => {
  const template = document.getElementById("order") as HTMLTemplateElement;

  const element = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;

  const form = new OrderForm(element, events);

  // первичный рендер состояния
  form.render({
    address: "",
    payment: "",
  });
  currentModal = "order";
  modal.setContent(form.render());
});

events.on("form:change", (data: Record<string, string>) => {
  // шаг 1: address / payment
  if ("address" in data || "payment" in data) {
    buyer.setData({
      address: data.address ?? "",
      payment: (data.payment as any) ?? buyer.getData().payment,
    });

    const errors = buyer.validate();

    const content = modalContainer.querySelector("form[name='order']");
    if (!content) return;

    const form = new OrderForm(content as HTMLElement, events);

    form.render({
      address: buyer.getData().address,
      payment: (buyer.getData().payment ?? "") as string,
    });

    form.isValid = !errors.address && !errors.payment;
    form.errors = errors.address || errors.payment || "";
  }

  // шаг 2: email / phone
  if ("email" in data || "phone" in data) {
    buyer.setData({
      email: data.email ?? "",
      phone: data.phone ?? "",
    });

    const errors = buyer.validate();

    const content = modalContainer.querySelector("form[name='contacts']");
    if (!content) return;

    const form = new ContactsForm(content as HTMLElement, events);

    form.isValid = !errors.email && !errors.phone;
    form.errors = errors.email || errors.phone || "";
  }
});

events.on("form:submit", (data: Record<string, string>) => {
  //если шаг 1
  if ("address" in data || "payment" in data) {
    const template = document.getElementById("contacts") as HTMLTemplateElement;

    const element = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    const form = new ContactsForm(element, events);
    currentModal = "contacts";
    modal.setContent(form.render());
    return;
  }

  //если шаг 2
  if ("email" in data || "phone" in data) {
    const order = {
      ...buyer.getData(),
      items: cart.getItems().map((i) => i.id),
      total: cart.getTotalPrice(),
    };

    apiService
      .createOrder(order as any)
      .then(() => {
        const total = order.total;

        //очистка полей и корзины
        cart.clear();
        buyer.clear();

        //успешный заказ
        const template = document.getElementById(
          "success",
        ) as HTMLTemplateElement;

        const element = template.content.firstElementChild!.cloneNode(
          true,
        ) as HTMLElement;

        const success = new Success(element, events);

        const successElement = success.render({
          totalLabel: `${total} синапсов`,
        });

        currentModal = "success";
        modal.setContent(successElement);
      })
      .catch((err) => {
        console.error("Ошибка оформления:", err);
      });
  }
});

events.on("success:close", () => {
  modal.close();
});
