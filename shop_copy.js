const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
    <div class="goods-list">
        <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
    `
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <img :src="imgGoods" alt="">
        <button>Добавить в корзину</button>
    </div>
    `
});

Vue.component('search', {
    props: ['value'],
    template: `
        <input type="text" class="search__input"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)">
    `
})

Vue.component('cart-list', {
    props: ['goods'],
    template: `
        <div class="cart-list">
            <cart-item v-for="good in goods" :key="good.id_product" :good="good"></cart-item>
        </div>
        `
});

Vue.component('cart-item', {
    props: ['good'],
    template: `
    <div class="cart-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <img :src="imgGoods" alt="">
        <button>Удалить</button>
    </div>
    `
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        imgGoods: 'images/nofoto.jpg',
        filteredGoods: [],
        cartGoods: [],
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
                        resolve(xhr.response);
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
            })
        },

        makePOSTRequest(url, data) {
            return new Promise((resolve) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        resolve(xhr.response);
                    }
                }
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(JSON.stringify(data));
            })
        },

        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));

        },

        addToCart(id) {
            let toCart;

            this.goods.forEach(function (prod) {
                if (id == prod.id_product) {
                    toCart = {
                        id: prod.id_product,
                        name: prod.product_name,
                        price: prod.price,
                        image: prod.img
                    }
                }
            });
            this.cartGoods.push(toCart);
            // this.finalPriceCart();
            this.makePOSTRequest('/addToCart', toCart);
        },

        deleteFromCart(id) {
            let getIdElemen;
            this.cartGoods.forEach(function (prod, i) {
                let thisId = prod.id_product;
                if (id == thisId) {
                    getIdElemen = i;
                }

            });
            this.cartGoods.splice(getIdElemen, 1);
            // this.finalPriceCart();
            this.makePOSTRequest('/deleteFromCart', this.cartGoods);
        },

        visibleCart() {
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },

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
        },

    },

    mounted() {
        this.makeGETRequest(`http://localhost:3000/catalogData`)
            .then((prop) => {
                this.goods = JSON.parse(prop);
                this.filteredGoods = JSON.parse(prop);
                console.log(this.goods);
            });

        this.makeGETRequest(`http://localhost:3000/cartData`)
            .then((prop) => {
                this.cartGoods = JSON.parse(prop);
                console.log(this.cartGoods);
            });
    }
});

// class GoodsItem {
//     constructor(product_name = 'Товар отсутствует', price = 'Цена не установлена', image = 'images/nofoto.jpg') {
//         this.product_name = product_name;
//         this.price = price;
//         this.image = image;
//     }
//     render() {
//         return `<div class="goods__item"><h3>${this.product_name}</h3><p>${this.price}</p><img src=${this.image}></div>`;
//     }
// }

// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.filteredGoods = [];
//     }

//     // filterGoods(value) {
//     //     const regexp = new RegExp(value, 'i');
//     //     this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
//     //     this.render();
//     // }

//     render() {

//         let listHtml = '';
//         this.filteredGoods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price);
//             listHtml += goodItem.render();
//         });
//         document.querySelector('.goods__wrapper').innerHTML = listHtml;
//     }
// }

// let list = new GoodsList();
// list.fetchGoods()
//     .then(() => list.render())
//     .then(() => list.finalGoodsPrice());



// класс для создания товара в корзине
// class CartItem {
//     constructor() {

//     }

//     deleteGoodsItem() {
//         // удаление товара
//     }

//     сountItem() {
//         // подсчет общего количества конкретного товара в корзине
//     }

//     finalPriceItem() {
//         // итоговая стоимость конкретного товара
//     }

//     increaseDecreaseItem() {
//         // увеличить-уменьшить количество товара в корзине
//     }

//     cartItemRender() {
//         // отображение на странице карточки товара
//     }
// }

// // список товаров в корзине
// class CartList {
//     constructor() {
//         this.cartGoods = [];
//     }

//     fetchGoodsCart() {
//         return makeGETRequest(`${API_URL}/getBasket.json`)
//             .then((prop) => {
//                 this.cartGoods = JSON.parse(prop);
//                 console.log(this.cartGoods);
//             });
//     }

//     // подсчет общей стоимости корзины
//     finalPriceCart() {
//         let finalPriceCart = 0;
//         for (let prop in this.cartGoods) {
//             if (isNaN(this.cartGoods[prop].price)) {
//                 finalPriceCart += 0;
//             } else {
//                 finalPriceCart += this.goods[prop].price;
//             }
//         }
//         console.log(finalPriceCart);
//     }

//     payOrder() {
//         // оформить заказ, оплатить
//     }

//     renderCart() {
//         // отображение списка корзины
//     }
// }

// function addCart(event) {
//     app.addToCart(event.target.id_product);
// }
// function deleteItem(event) {
//     app.deleteFromCart(event.target.id_product);
// }
