class Collatz {

}

// class CollatzMap {
//     private readonly mapping: Map<String, CollatzNode>;

//     constructor() {
//         this.mapping = new Map<String, CollatzNode>();
//     }

//     add(val: String, node: CollatzNode) {
//         this.mapping.set(node.getValue(), node);
//         return this;
//     }

//     get(val: String) {
//         return this.mapping.get(val);
//     }
// }


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

/**
 * @return Array of "step" values
 */
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

// let medium = new StringMedium();
// mapping.get("1").printUp(medium);
// console.log(medium.read())
addCollatz(20);
addCollatz(3);
addCollatz(13);
addCollatz(80);
addCollatz(17);
addCollatz(104);

// let medium = new StringMedium();
// mapping.get("1").printUp(medium);
// console.log(medium.read())

console.dir(mapping.get("1"));

// console.dir(mapping);
// console.log("next::::");

// medium = new StringMedium();
// addCollatz(20).printUp(medium);
// console.log(medium.read());

// console.dir(mapping);

// for(var i = 1; i < stop; i++){
//     var v = i, v2;
//     var node = new CollatzNode(i+""), node2, node3;
//     node3 = node;
//     do {
//         mapping.set(v2+"", node2);
//         v2 = getPrev(v);
//         node2 = new CollatzNode(v2+"");
//         node3.addToPrev(node2);
//         node3 = node2;
//     } while(!mapping.has(v2))
//     node3.addToPrev(mapping.get(v2+""));
//}