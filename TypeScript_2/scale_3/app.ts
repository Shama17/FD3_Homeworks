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

interface IStorageEngine {
    addItem(item : Products):void;
    getItem(item: number): Products;
    getCount(): number
}

class ScalesStorageEngineArray  implements  IStorageEngine{
    products: Products [] = [];

    constructor() {
    }

    addItem(item: Products) {
        this.products.push(item);
    }

    getItem (index : number) {
        return this.products[index]
    }

    getCount () {
        return this.products.length
    }
}

class ScalesStorageEngineLocalStorage implements  IStorageEngine {
    key: string = 'product';

    constructor() {
        localStorage.setItem(this.key, JSON.stringify([]))
    }

    addItem(product: Products) {
        let currentState: any [] = JSON.parse(localStorage.getItem(this.key));
        currentState.push(product);
        localStorage.setItem(this.key, JSON.stringify(currentState));
    }

    getItem (index : number) {
        let currentState: any[] = JSON.parse(localStorage.getItem(this.key));
        return new Products(currentState[index].name, currentState[index].scale)
    }

    getCount () {
        return  JSON.parse(localStorage.getItem(this.key)).length
    }

}

class Scales<StorageEngine extends IStorageEngine> {

    storageEngine: StorageEngine;

    constructor() {
    }

    addProduct(_storageEngine: StorageEngine){
        this.storageEngine = _storageEngine;
    }

    getNameList(): string[] {
        let productArr: string[] = [];
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            productArr.push(this.storageEngine.getItem(i).getName());
        }
        return productArr
    };

    getSumScale(): number {
        let totalWeight: number = 0;
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            totalWeight += this.storageEngine.getItem(i).getScale();
        }
        return totalWeight
    }
}



let apple = new Products("Яблоко белый налив", 2);
console.log(apple.getName());
console.log(apple.getScale());

let pinkApple = new Products("Яблоко розовый налив", 1);
console.log(pinkApple.getName());
console.log(pinkApple.getScale());

let tomato = new Products("Помидор красный", 3);
console.log(tomato.getName());
console.log(tomato.getScale());

let pineApple = new Products("Ананас", 5);
console.log(pineApple.getName());
console.log(pineApple.getScale());

let scalesStorageEngineArray = new ScalesStorageEngineArray;
let scalesStorageEngineLocalStorage = new ScalesStorageEngineLocalStorage;

scalesStorageEngineArray.addItem(apple);
scalesStorageEngineArray.addItem(pinkApple);

scalesStorageEngineLocalStorage.addItem(tomato);
scalesStorageEngineLocalStorage.addItem(pineApple);

let scaleArray = new Scales<ScalesStorageEngineArray>();
let scaleLocalStorage = new Scales<ScalesStorageEngineLocalStorage>();

scaleArray.addProduct(scalesStorageEngineArray);
scaleLocalStorage.addProduct(scalesStorageEngineLocalStorage);


console.log("Вес продуктов в массиве " + scaleArray.getSumScale());
console.log("Array: " + scaleArray.getNameList());

console.log("Вес продуктов в Local Storage " + scaleLocalStorage.getSumScale());
console.log("Local Storage:  " + scaleLocalStorage.getNameList());



