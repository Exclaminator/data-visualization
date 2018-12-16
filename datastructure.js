var mapping = new Map();

var CollatzNode = (function () {
    function CollatzNode(value, next, fast) {
        this.value = value;
        if (typeof next == "undefined") next = [];
        if (typeof fast == "undefined") fast = false;
    }
    CollatzNode.prototype.setPrev = function (node) {
        this.previous = node;
        this.previous.next.push(this);
    };

    CollatzNode.prototype.getValue = function () {
        return this.value;
    };

    CollatzNode.prototype.traverseDown = function (nodeVisitor) {
        nodeVisitor(this);

        if (this.previous) {
            this.previous.traverseDown(nodeVisitor);
        }
    }

    return CollatzNode;
})();

function isEven(n) {
    return !(n & 1);
}

function getPrev(n) {
    if (n == 1) {
        return 1;
    }

    if (isEven(n)) {
        return n / 2;
    } else {
        return 3 * n + 1;
    }
}

// makes a fast map
function getNext(n) {
    var r = [2*n];
    if (n%3 == 2) r.push((2*n-1)/3);
    return r;
}

mapping.set(1, new CollatzNode(1));

function addCollatz(i) {
    if (mapping.has(i)) {
        return mapping.get(i);
    }

    var prev = getPrev(i);
    var node = new CollatzNode(i);

    node.setPrev(addCollatz(prev));
    mapping.set(i, node);
    return node;
}

console.dir(mapping.get("1"));

var stop = 6000;
for(var i = 1; i<stop; i++) {
    addCollatz(i);
}
console.dir(mapping);