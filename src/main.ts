import "./scss/styles.scss";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { ApiLarek } from "./components/models/ApiLarek";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";


//Проверяем
//Каталог
const catalog = new Catalog();

catalog.setProducts(apiProducts.items);
console.log("Каталог: все товары", catalog.getProducts());

const firstProductId = apiProducts.items[0].id;
const foundProduct = catalog.getProductById(firstProductId);
console.log("Каталог: товар по id", foundProduct);

if (foundProduct) {
  catalog.setSelectedProduct(foundProduct);
}

console.log("Каталог: выбранный товар", catalog.getSelectedProduct());

//Корзина
const cart = new Cart();

const item1 = apiProducts.items[0];
const item2 = apiProducts.items[1];

cart.addItem(item1);
cart.addItem(item2);

console.log("Корзина: товары после добавления", cart.getItems());
console.log("Корзина: есть item1?", cart.hasItem(item1.id));
console.log("Корзина: количество", cart.getTotalCount());
console.log("Корзина: сумма", cart.getTotalPrice());

cart.removeItem(item1);
console.log("Корзина: после удаления item1", cart.getItems());

cart.clear();
console.log("Корзина: после очистки", cart.getItems());

//Покупатель
const buyer = new Buyer();

buyer.setData({ email: "pm8@yandex.com" });
console.log("Покупатель: после email", buyer.getData());
console.log("Покупатель: ошибки (частично)", buyer.validate());

buyer.setData({
  phone: "+88005553535",
  address: "Краснодар",
  payment: "cash",
});

console.log("Покупатель: все данные", buyer.getData());
console.log("Покупатель: ошибки (полностью)", buyer.validate());

buyer.clear();
console.log("Покупатель: после очистки", buyer.getData());

//Взаимодействие с API
const api = new Api(API_URL);
const apiService = new ApiLarek(api);

apiService
  .getProducts()
  .then((data) => {
    console.log("Ответ сервера:", data);

    catalog.setProducts(data.items);

    console.log("Каталог после загрузки с сервера:", catalog.getProducts());
  })
  .catch((err) => {
    console.error("Ошибка запроса:", err);
  });
