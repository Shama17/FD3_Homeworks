var Products = /** @class */ (function () {
    function Products(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Products.prototype.getName = function () {
        return this.name;
    };
    ;
    Products.prototype.getScale = function () {
        return this.scale;
    };
    return Products;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.products = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.products.push(item);
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.products[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.products.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.key = 'product';
        localStorage.setItem(this.key, JSON.stringify([]));
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (product) {
        var currentState = JSON.parse(localStorage.getItem(this.key));
        currentState.push(product);
        localStorage.setItem(this.key, JSON.stringify(currentState));
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var currentState = JSON.parse(localStorage.getItem(this.key));
        return new Products(currentState[index].name, currentState[index].scale);
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        return JSON.parse(localStorage.getItem(this.key)).length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Scales = /** @class */ (function () {
    function Scales(_storageEngine) {
        this.storageEngine = null;
        this.storageEngine = _storageEngine;
    }
    Scales.prototype.addProduct = function (item) {
        return this.storageEngine.addItem(item);
    };
    Scales.prototype.getNameList = function () {
        var productArr = [];
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            productArr.push(this.storageEngine.getItem(i).getName());
        }
        return productArr;
    };
    ;
    Scales.prototype.getSumScale = function () {
        var totalWeight = 0;
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            totalWeight += this.storageEngine.getItem(i).getScale();
        }
        return totalWeight;
    };
    return Scales;
}());
var apple = new Products("Яблоко белый налив", 2);
console.log(apple.getName());
console.log(apple.getScale());
var pinkApple = new Products("Яблоко розовый налив", 1);
console.log(pinkApple.getName());
console.log(pinkApple.getScale());
var tomato = new Products("Помидор красный", 3);
console.log(tomato.getName());
console.log(tomato.getScale());
var pineApple = new Products("Ананас", 5);
console.log(pineApple.getName());
console.log(pineApple.getScale());
var scalesStorageEngineArray = new ScalesStorageEngineArray;
var scalesStorageEngineLocalStorage = new ScalesStorageEngineLocalStorage;
var scaleArray = new Scales(scalesStorageEngineArray);
var scaleLocalStorage = new Scales(scalesStorageEngineLocalStorage);
scaleArray.addProduct(apple);
scaleArray.addProduct(pinkApple);
scaleLocalStorage.addProduct(tomato);
scaleLocalStorage.addProduct(pineApple);
console.log("Вес продуктов в массиве " + scaleArray.getSumScale());
console.log("Array: " + scaleArray.getNameList());
console.log("Вес продуктов в Local Storage " + scaleLocalStorage.getSumScale());
console.log("Local Storage:  " + scaleLocalStorage.getNameList());
//# sourceMappingURL=app.js.map