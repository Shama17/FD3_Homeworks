class Products {
    name: string;
    scale: number;

    constructor(_name: string, _scale: number) {
        this.name = _name;
        this.scale = _scale
    }

    getName() {
        return this.name
    };

    getScale() {
        return this.scale
    }
}

class Apple extends Products {
};

class Tomato extends Products {
};

class PineApple extends Products {
};

class Scales {

    products: Products [] = [];

    constructor() {
    }

    addProduct(_product: Products) {
        this.products.push(_product);
    }

    getNameList() {
        let productArr: string[] = [];
        this.products.forEach(product => {
            productArr.push(product.getName())
        });
        return productArr
    };

    getSumScale() {
        let totalWeight: number = 0;
        this.products.forEach(product => {
            totalWeight += product.getScale()
        });
        return totalWeight
    }
}


let apple: Apple = new Apple("Яблоко белый налив", 2);
console.log(apple.getName());
console.log(apple.getScale());

let pinkApple: Apple = new Apple("Яблоко розовый налив", 1);
console.log(pinkApple.getName());
console.log(pinkApple.getScale());

let tomato: Tomato = new Tomato("Помидор красный", 3);
console.log(tomato.getName());
console.log(tomato.getScale());

let pineApple: PineApple = new PineApple("Ананас", 5);
console.log(pineApple.getName());
console.log(pineApple.getScale());

let newScale: Scales = new Scales();
newScale.addProduct(apple);
newScale.addProduct(pinkApple);
newScale.addProduct(tomato);
newScale.addProduct(pineApple);
console.log("Вес продуктов " + newScale.getSumScale());
console.log(newScale.getNameList());





