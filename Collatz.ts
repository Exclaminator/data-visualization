interface CollatzNumber {
    parent(): CollatzNumber;
    children(): CollatzNumber[];
    value(): number;
}

interface CollatzConjecture {
    parentOf(collatzNumber: CollatzNumber);
    childrenOf(collatzNumber: CollatzNumber);
}

class CollatzConjectureDefault implements CollatzConjecture {
    private map: Map<number, CollatzNumber>;

    constructor() {
        this.map = new Map<number, CollatzNumber>();
    }

    childrenOf(collatzNumber: CollatzNumber) {
        let value = collatzNumber.value();

        let r = [new CollatzNumberSimple(this, value*2)];
        if (value % 6 == 4) {
            r.push(new CollatzNumberSimple(this,(value-1)/3));
        }

        r.forEach(v => {if(this.map.has(v.value)) this.map.set(v.value, v)});
        return r;
    }

    parentOf(collatzNumber: CollatzNumber): CollatzNumber | undefined {
        if (collatzNumber.value() == 1) {
            return;
        }

        let parent = new CollatzNumberSimple(this, this.getPrev(collatzNumber.value()));
        if (!this.map.has(parent.value())) {
            this.map.set(parent.value(), parent);
        }
        return parent;
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
    private map: Map<number, CollatzNumber>;

    constructor() {
        this.map = new Map<number, CollatzNumber>();
    }

    childrenOf(collatzNumber: CollatzNumber) {
        let value = collatzNumber.value();

        let r = [new CollatzNumberSimple(this, value*2)];
        if (value % 3 == 2) {
            r.push(new CollatzNumberSimple(this,(value*2 - 1) * 3));
        }

        r.forEach(v => {if(this.map.has(v.value)) this.map.set(v.value, v)});
        return r;
    }

    parentOf(collatzNumber: CollatzNumber): CollatzNumber | undefined {
        if (collatzNumber.value() == 1) {
            return;
        }

        let parent = new CollatzNumberSimple(this, this.getPrev(collatzNumber.value()));
        if (!this.map.has(parent.value())) {
            this.map.set(parent.value(), parent);
        }
        return parent;
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

    constructor(conjecture: CollatzConjecture, value: number) {
        this.conjecture = conjecture;
        this._value = value;
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

    value(): number {
        return this._value;
    }

    toString(): string {
        return `${this._value}`;
    }
}

let collatzConjecture = new CollatzConjectureFast();
let collatzNumber: CollatzNumber = new CollatzNumberSimple(collatzConjecture, 20);

while (collatzNumber.value() > 1) {
    console.log(`Value: ${collatzNumber}`);
    collatzNumber = collatzNumber.parent();
}

// collatzNumber = new CollatzNumberSimple()
while (collatzNumber.value() < 1000) {
    console.log(`Value: ${collatzNumber}, children: ${collatzNumber.children()}`);
    collatzNumber = collatzNumber.children()[0];
}