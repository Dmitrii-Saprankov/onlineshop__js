const goods = [
    {},
    { title: 'Socks' },
    { price: 350 },
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

const renderGoodsItem = (title = 'Товар отсутствует', price = 'Цена не установлена', image = 'images/nofoto.jpg') => {
    return `<div class="goods__item"><h3>${title}</h3><p>${price}</p><img src=${image}></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
    document.querySelector('.goods__wrapper').innerHTML = goodsList.join('');
}


renderGoodsList(goods);
