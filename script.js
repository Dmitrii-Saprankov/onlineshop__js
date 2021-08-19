const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        imgGoods: 'images/nofoto.jpg',
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },

    methods: {
        makeGETRequest(url) {
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
            })
        },

        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));

        },

        // visibleCart() {
        //     if (this.isVisibleCart == false) {
        //         this.isVisibleCart = true;
        //     } else {
        //         this.isVisibleCart = false;
        //     }
        // },
    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then((prop) => {
                this.goods = JSON.parse(prop);
                this.filteredGoods = JSON.parse(prop);
                console.log(this.goods);
            });
    }
});

class GoodsItem {
    constructor(product_name = 'Товар отсутствует', price = 'Цена не установлена', image = 'images/nofoto.jpg') {
        this.product_name = product_name;
        this.price = price;
        this.image = image;
    }
    render() {
        return `<div class="goods__item"><h3>${this.product_name}</h3><p>${this.price}</p><img src=${this.image}></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    // filterGoods(value) {
    //     const regexp = new RegExp(value, 'i');
    //     this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    //     this.render();
    // }

    render() {

        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods__wrapper').innerHTML = listHtml;
    }
}

let list = new GoodsList();
// list.fetchGoods()
//     .then(() => list.render())
//     .then(() => list.finalGoodsPrice());



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
