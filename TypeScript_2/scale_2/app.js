var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.addProduct = function (_product) {
        this.products.push(_product);
    };
    Scales.prototype.getNameList = function () {
        var productArr = [];
        this.products.forEach(function (product) {
            productArr.push(product.getName());
        });
        return productArr;
    };
    ;
    Scales.prototype.getSumScale = function () {
        var totalWeight = 0;
        this.products.forEach(function (product) {
            totalWeight += product.getScale();
        });
        return totalWeight;
    };
    return Scales;
}());
var Apple = /** @class */ (function () {
    function Apple(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Apple.prototype.getName = function () {
        return this.name;
    };
    ;
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    return Apple;
}());
var Tomato = /** @class */ (function () {
    function Tomato(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Tomato.prototype.getName = function () {
        return this.name;
    };
    ;
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    return Tomato;
}());
var PineApple = /** @class */ (function () {
    function PineApple(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    PineApple.prototype.getName = function () {
        return this.name;
    };
    ;
    PineApple.prototype.getScale = function () {
        return this.scale;
    };
    return PineApple;
}());
var apple = new Apple("Яблоко белый налив", 2);
console.log(apple.getName());
console.log(apple.getScale());
var pinkApple = new Apple("Яблоко розовый налив", 1);
console.log(pinkApple.getName());
console.log(pinkApple.getScale());
var tomato = new Tomato("Помидор красный", 3);
console.log(tomato.getName());
console.log(tomato.getScale());
var pineApple = new PineApple("Ананас", 5);
console.log(pineApple.getName());
console.log(pineApple.getScale());
var newScale = new Scales();
newScale.addProduct(apple);
newScale.addProduct(pinkApple);
newScale.addProduct(tomato);
newScale.addProduct(pineApple);
console.log("Вес продуктов " + newScale.getSumScale());
console.log(newScale.getNameList());
//# sourceMappingURL=app.js.map