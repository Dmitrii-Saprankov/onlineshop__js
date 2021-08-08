class GoodsItem {
    constructor(title = 'Товар отсутствует', price = 'Цена не установлена', image = 'images/nofoto.jpg') {
        this.title = title;
        this.price = price;
        this.image = image;
    }
    render() {
        return `<div class="goods__item"><h3>${this.title}</h3><p>${this.price}</p><img src=${this.image}></div>`;;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {},
            { title: 'Socks', price: 50, image: 'images/item.jpg' },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250, image: 'images/item.jpg' },
            { title: 'Shirt', price: 150, image: 'images/item.jpg' },
            { title: 'Socks', price: 50, image: 'images/item.jpg' },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Shirt', price: 150, image: 'images/item.jpg' },
            { title: 'Socks', price: 50, image: 'images/item.jpg' },
            { title: 'Jacket', price: 350, image: 'images/item.jpg' },
            { title: 'Shoes', price: 250, image: 'images/item.jpg' },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.image);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods__wrapper').innerHTML = listHtml;
    }

    // метод подсчета общей стоимсоти товаров в каталоге
    finalGoodsPrice() {
        let finalPrice = 0;
        for (let prop in this.goods) {
            if (isNaN(this.goods[prop].price)) {
                finalPrice += 0;
            } else {
                finalPrice += this.goods[prop].price;
            }
        }
        console.log(finalPrice);
    }
}

let list = new GoodsList();
list.fetchGoods();
list.render();
list.finalGoodsPrice();

// класс для создания товара в корзине
class CartItem {
    constructor() {

    }

    addGoodsItem() {
        // добавление товара из списка каталога
    }

    deleteGoodsItem() {
        // удаление товара
    }

    сountItem() {
        // подсчет общего количества конкретного товара в корзине
    }

    finalPriceItem() {
        // итоговая стоимость конкретного товара
    }

    increaseDecreaseItem() {
        // увеличить-уменьшить количество товара в корзине
    }

    cartItemRender() {
        // отображение на странице карточки товара
    }
}

// список товаров в корзине
class CartList {
    constructor() {
        this.cartGoods = [];
    }

    fetchGoodsCart() {
        // список товаров в корзине
    }

    // подсчет общей стоимости корзины
    finalPriceCart() {
        let finalPriceCart = 0;
        for (let prop in this.cartGoods) {
            if (isNaN(this.cartGoods[prop].price)) {
                finalPriceCart += 0;
            } else {
                finalPriceCart += this.goods[prop].price;
            }
        }
        console.log(finalPriceCart);
    }

    payOrder() {
        // оформить заказ, оплатить
    }

    renderCart() {
        // отображение списка корзины
    }
}
