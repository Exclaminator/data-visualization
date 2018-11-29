var mapping: Map<String, CollatzNode> = new Map<String, CollatzNode>();

class CollatzNode {
    private value;
    private previous: CollatzNode;
    private next: CollatzNode[];

    constructor(value: String) {
        this.value = value;
        this.next = [];
    }

    setPrev(node: CollatzNode) {
        this.previous = node;
        this.previous.next.push(this);
    }
    
    getValue() {
        return this.value;
    }

    printDown(medium: Medium) {
        medium.write(this.getValue()); 
        if (this.previous) {
            this.previous.printDown(medium);
        }
    }

    printUp(medium: Medium) {
        medium.write(this.getValue());
        this.next.forEach(x => {
            medium.write("[");
            x.printUp(medium);
            medium.write("]");
        })
    }
}

function isEven(n) {
    return !(n & 1);
}

function getPrev(n) {
    if (n == 1) {
        return 1;
    }
    
    if (isEven(n)) {
        return n / 2;
    }
    else {
        return  3 * n + 1;
    }
}

interface Medium {
    write(value);
    read(): String;
}

// class StringMedium implements Medium {
//     private buffer: String;
//     constructor() {
//         this.buffer = "";
//     }

//     write(value) {
//         this.buffer = `${this.buffer} ${value}`;
//     }

//     read() {
//         return this.buffer;
//     }
// }

//class PrefixableStringMedium implements Medium


mapping.set("1", new CollatzNode("1"));

function addCollatz(i: number) {
    if(mapping.has(i+"")) {
        return mapping.get(i+"");
    }

    var prev = getPrev(i);
    var node = new CollatzNode(i+"");

    node.setPrev(addCollatz(prev));
    mapping.set(i+"", node);
    return node;
}