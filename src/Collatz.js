class CollatzNumbers {
    constructor(map, makeNewCollatzNumber) {
        this.map = map;
        this.makeNewCollatzNumber = makeNewCollatzNumber;
    }
    getOrNew(value) {
        if (!this.map.has(value)) {
            let newCollatz = this.makeNewCollatzNumber(value);
            this.map.set(value, newCollatz);
            return newCollatz;
        }
        else {
            return this.map.get(value);
        }
    }
}
class CollatzConjectureDefault {
    constructor() {
        this.collatzNumbers = new CollatzNumbers(new Map(), value => new CollatzNumberSimple(this, value));
    }
    childrenOf(collatzNumber) {
        let value = collatzNumber.value();
        let r = [this.collatzNumbers.getOrNew(value * 2)];
        if (value % 6 == 4 && value != 4) {
            r.push(this.collatzNumbers.getOrNew((value - 1) / 3));
        }
        return r;
    }
    parentOf(collatzNumber) {
        if (collatzNumber.value() == 1) {
            return;
        }
        return this.collatzNumbers.getOrNew(this.getPrev(collatzNumber.value()));
    }
    nextValue(collatzNumber) {
        return this.collatzNumbers.getOrNew(collatzNumber.value() + 1);
    }
    prevValue(collatzNumber) {
        if (collatzNumber.value() == 1) {
            return;
        }
        return this.collatzNumbers.getOrNew(collatzNumber.value() - 1);
    }
    get(target) {
        return this.collatzNumbers.getOrNew(target);
    }
    getPrev(n) {
        let isEven = !(n & 1);
        if (isEven) {
            return n / 2;
        }
        else {
            return 3 * n + 1;
        }
    }
}
class CollatzConjectureFast {
    constructor() {
        this.collatzNumbers = new CollatzNumbers(new Map(), value => new CollatzNumberSimple(this, value));
    }
    childrenOf(collatzNumber) {
        let value = collatzNumber.value();
        let r = [this.collatzNumbers.getOrNew(value * 2)];
        if (value % 3 == 2 && value != 2) {
            r.push(this.collatzNumbers.getOrNew((value * 2 - 1) / 3));
        }
        return r;
    }
    parentOf(collatzNumber) {
        if (collatzNumber.value() == 1) {
            return;
        }
        let parentValue = this.getPrev(collatzNumber.value());
        let parent = this.collatzNumbers.getOrNew(parentValue);
        return parent;
    }
    nextValue(collatzNumber) {
        return this.collatzNumbers.getOrNew(collatzNumber.value() + 1);
    }
    prevValue(collatzNumber) {
        if (collatzNumber.value() == 1) {
            return;
        }
        return this.collatzNumbers.getOrNew(collatzNumber.value() - 1);
    }
    get(target) {
        return this.collatzNumbers.getOrNew(target);
    }
    getPrev(n) {
        let isEven = !(n & 1);
        if (isEven) {
            return n / 2;
        }
        else {
            return (3 * n + 1) / 2;
        }
    }
}
class CollatzNumberSimple {
    constructor(conjecture, value) {
        this.conjecture = conjecture;
        this._value = value;
        this._depth = undefined;
    }
    children() {
        if (!this._children) {
            this._children = this.conjecture.childrenOf(this);
        }
        return this._children;
    }
    parent() {
        if (!this._parent) {
            this._parent = this.conjecture.parentOf(this);
        }
        return this._parent;
    }
    next() {
        if (!this._next) {
            this._next = this.conjecture.nextValue(this);
        }
        return this._next;
    }
    prev() {
        if (!this._prev) {
            this._prev = this.conjecture.prevValue(this);
        }
        return this._prev;
    }
    get(target) {
        return this.conjecture.get(target);
    }
    value() {
        return this._value;
    }
    depth() {
        if (this._depth === undefined) {
            if (this.value() === 1) {
                this._depth = 0;
            }
            else {
                this._depth = this.parent().depth() + 1;
            }
        }
        return this._depth;
    }
    toString() {
        return `${this._value}`;
    }
}
// let collatzConjecture = new CollatzConjectureFast();
// let collatzNumber: CollatzNumber = new CollatzNumberSimple(collatzConjecture, 20);
// while (collatzNumber.value() > 1) {
//     console.log(`Value: ${collatzNumber}`);
//     collatzNumber = collatzNumber.parent();
// }
// // collatzNumber = new CollatzNumberSimple()
// while (collatzNumber.value() < 1000) {
//     console.log(`Value: ${collatzNumber}, children: ${collatzNumber.children()}`);
//     collatzNumber = collatzNumber.children()[0];
// }
