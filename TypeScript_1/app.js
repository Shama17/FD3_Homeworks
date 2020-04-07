var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Apple;
}(Products));
;
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tomato;
}(Products));
;
var PineApple = /** @class */ (function (_super) {
    __extends(PineApple, _super);
    function PineApple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PineApple;
}(Products));
;
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