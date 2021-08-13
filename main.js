function makeGETRequest(url) {
    return new Promise((resolve) => {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
}

/* function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        setTimeout(() => {
            if (url) {
                let b = xhr.responseText;
                resolve(b);
            } else {
                reject('Error');
            }
        }, 0);


        xhr.open("GET", url, true);
        xhr.send();
    });
} */

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name = 'Товар отсутствует', price = 'Цена не установлена', image = 'images/nofoto.jpg') {
        this.product_name = product_name;
        this.price = price;
        this.image = image;
    }
    render() {
        return `<div class="goods__item"><h3>${this.product_name}</h3><p>${this.price}</p><img src=${this.image}></div>`;;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {

        //return await fetch(`${API_URL}/catalogData.json`).then(resp => resp.json());

        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then((prop) => {
                this.goods = JSON.parse(prop);
                console.log(this.goods);
            });
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.image);
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
        document.querySelector('.total-price__wrapper').innerHTML = finalPrice;
    }
}

let list = new GoodsList();
list.fetchGoods()
    .then(() => list.render())
    .then(() => list.finalGoodsPrice());


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
        return makeGETRequest(`${API_URL}/getBasket.json`)
            .then((prop) => {
                this.cartGoods = JSON.parse(prop);
                console.log(this.cartGoods);
            });
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
