function showBreadcrumbs() {
    d3.select("#breadcrumbs").remove();
    d3.select("#breadrow").append("svg")
        .attr("id", "breadcrumbs")
        .attr("class", "col-md-12")
        .attr("style", "height: 30px;");

    breadcrumb = d3.breadcrumb()
        .container('#breadcrumbs')
        .padding(5)
        .wrapWidth(window.innerWidth)  // hint:  set 100
        .height(28)
        .fontSize(14)
        .marginLeft(0)
        .marginTop(4)
        .leftDirection(false);

    var objectstack = rootStack.concat(currentRoot).map(node => {
        return {text: node.value(), fill: colorScheme.forNumber(node.value())};
    });
    breadcrumb.show(objectstack);
}