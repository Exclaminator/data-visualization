interface CollatzNumber {
    parent(): CollatzNumber;
    children(): CollatzNumber[];
    value(): number;
    depth(): number;
    next(): CollatzNumber;
    prev(): CollatzNumber | undefined;
    get(target: number) : CollatzNumber;
}

interface CollatzConjecture {
    parentOf(collatzNumber: CollatzNumber);
    childrenOf(collatzNumber: CollatzNumber);
    nextValue(collatzNumber: CollatzNumber);
    prevValue(collatzNumber: CollatzNumber);
    get(target: number): CollatzNumber;
}

class CollatzNumbers {
    private map: Map<number, CollatzNumber>;
    private makeNewCollatzNumber: (value: number) => CollatzNumber;

    constructor(map: Map<number, CollatzNumber>, makeNewCollatzNumber: (value: number) => CollatzNumber) {
        this.map = map;
        this.makeNewCollatzNumber = makeNewCollatzNumber;
    }

    getOrNew(value: number): CollatzNumber {
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

class CollatzConjectureDefault implements CollatzConjecture {
    private collatzNumbers: CollatzNumbers;

    constructor() {
        this.collatzNumbers = new CollatzNumbers(
            new Map<number, CollatzNumber>(),
                value => new CollatzNumberSimple(this, value)
        );
    }

    childrenOf(collatzNumber: CollatzNumber) {
        let value = collatzNumber.value();

        let r = [this.collatzNumbers.getOrNew(value*2)];
        if (value % 6 == 4 && value != 4) {
            r.push(this.collatzNumbers.getOrNew((value-1)/3));
        }

        return r;
    }

    parentOf(collatzNumber: CollatzNumber): CollatzNumber | undefined {
        if (collatzNumber.value() == 1) {
            return;
        }

        return this.collatzNumbers.getOrNew(this.getPrev(collatzNumber.value()));
    }

    nextValue(collatzNumber: CollatzNumber): CollatzNumber {
        return this.collatzNumbers.getOrNew(collatzNumber.value() + 1);
    }

    prevValue(collatzNumber: CollatzNumber): CollatzNumber | undefined  {
        if (collatzNumber.value() == 1) {
            return;
        }

        return this.collatzNumbers.getOrNew(collatzNumber.value() - 1);
    }

    get(target: number) {
        return this.collatzNumbers.getOrNew(target);
    }

    private getPrev(n) {
        let isEven = !(n & 1);

        if (isEven) {
            return n / 2;
        } else {
            return 3 * n + 1;
        }
    }
}

class CollatzConjectureFast implements CollatzConjecture {
    private collatzNumbers: CollatzNumbers;

    constructor() {
        this.collatzNumbers = new CollatzNumbers(
            new Map<number, CollatzNumber>(),
            value => new CollatzNumberSimple(this, value)
        );
    }

    childrenOf(collatzNumber: CollatzNumber) {
        let value = collatzNumber.value();

        let r = [this.collatzNumbers.getOrNew(value*2)];
        if (value % 3 == 2 && value != 2) {
            r.push(this.collatzNumbers.getOrNew((value*2 - 1) / 3));
        }

        return r;
    }

    parentOf(collatzNumber: CollatzNumber): CollatzNumber | undefined {
        if (collatzNumber.value() == 1) {
            return;
        }

        let parentValue = this.getPrev(collatzNumber.value());
        let parent = this.collatzNumbers.getOrNew(parentValue);
        return parent;
    }

    nextValue(collatzNumber: CollatzNumber): CollatzNumber {
        return this.collatzNumbers.getOrNew(collatzNumber.value() + 1);
    }

    prevValue(collatzNumber: CollatzNumber): CollatzNumber | undefined  {
        if (collatzNumber.value() == 1) {
            return;
        }

        return this.collatzNumbers.getOrNew(collatzNumber.value() - 1);
    }

    get(target: number) {
        return this.collatzNumbers.getOrNew(target);
    }
    
    private getPrev(n) {
        let isEven = !(n & 1);

        if (isEven) {
            return n / 2;
        } else {
            return (3 * n + 1)/2;
        }
    }
}

class CollatzNumberSimple implements CollatzNumber {
    private conjecture: CollatzConjecture;

    private _value: number;
    private _children: CollatzNumber[];
    private _parent: CollatzNumber;
    private _depth: number | undefined;
    private _next: CollatzNumber;
    private _prev: CollatzNumber | undefined;

    constructor(conjecture: CollatzConjecture, value: number) {
        this.conjecture = conjecture;
        this._value = value;
        this._depth = undefined;
    }

    children(): CollatzNumber[] {
        if (!this._children) {
            this._children = this.conjecture.childrenOf(this);
        }

        return this._children;
    }

    parent(): CollatzNumber {
        if (!this._parent) {
            this._parent = this.conjecture.parentOf(this);
        }

        return this._parent;
    }

    next() : CollatzNumber {
        if (!this._next) {
            this._next = this.conjecture.nextValue(this);
        }
        
        return this._next;
    }

    prev() : CollatzNumber | undefined{
        if (!this._prev) {
            this._prev = this.conjecture.prevValue(this);
        }
        
        return this._prev;
    }

    get(target: number) : CollatzNumber {
        return this.conjecture.get(target);
    }

    value(): number {
        return this._value;
    }

    depth(): number {
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

    toString(): string {
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