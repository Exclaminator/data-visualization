function showStem(root) {
    d3.select("#stemcrumbs").remove();
    d3.select("#stemrow").append("svg")
        .attr("id", "stemcrumbs")
        .attr("class", "col-md-12");

    stemcrumbs = d3.breadcrumb()
        .container('#stemcrumbs')
        .padding(5)
        .wrapWidth(window.innerWidth-100)  // hint:  set 100
        .height(28)
        .fontSize(14)
        .marginLeft(0)
        .marginTop(4)
        .leftDirection(false);

    let objectstack = [];
    let node = root;
    for(let i = 0; i <= root.depth(); i++) {
        objectstack[i] = {
            text: node.value(),
            fill: colorScheme.forNumber(node.value())
        };
        node = node.parent();
    }
    stemcrumbs.show(objectstack);
}