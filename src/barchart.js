///////
// Bar chart
///////
function barChart(root) {
    let node = root;
    let maxDepth = 0;
    let maxDepthNode = 0;
    for (let i = 0; i < barChart_numHorizontalElements; i++) {
        maxDepth = Math.max(node.depth(), maxDepth);
        if (node.depth() == maxDepth) {
            maxDepthNode = node.value();
        }
        node = node.next();
    }

    const svg = d3.select("#barchart");
    const height = parseInt(svg.style("height"));
    const width = parseInt(svg.style("width"))-8;

    // don't remove the +1, hacky reasons
    const squareHeight = (height-100) / (maxDepth + 1);
    const squareWidth = width / barChart_numHorizontalElements;

    d3.select("#barchart").remove();
    var svgContainer = d3.select("#visrow").append("svg")
        .attr("id", "barchart")
        .attr("class", "col-md-7");
    
    function drawbox(x, value) {
        svgContainer.select(".hinbox").remove();

        var box = svgContainer.append("g")
            .attr("class", "hinbox")
            .attr("transform", "translate("+ (x-0.5)*squareWidth +", "+ (height - 50) +")");

        // box.append("rect")
        //     .attr("width", 100)
        //     .attr("height", 30)
        //     .attr("fill", "pink");

        box.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("dy", ".35em")
            .attr("fill", "black")
            .text(value);
    }
    drawbox(maxDepthNode-root.value(), maxDepthNode);
    
    node = root;
    let innernode = root;

    for (var i = 0; i < barChart_numHorizontalElements; i++) {
        innernode = node;
        for (var j = 0; j <= node.depth(); j++) {
            svgContainer.append("rect")
                .attr("x", i*squareWidth)
                //.attr("y", height - (j*squareHeight))     // inverted version
                .attr("y", height - 50 - (node.depth()+1)*squareHeight + (j*squareHeight))
                .attr("width", squareWidth)
                .attr("height", squareHeight)
                .attr("title", innernode.value())
                .attr("class", "bar"+innernode.value() + " cBar"+node.value())
                .on("mouseover", ((innernode, node) => () => { highlight(node, innernode); drawbox(node.value() - root.value(), node.value()) })(innernode, node))
                .on("click", (innernode => () => updateRoot(innernode))(innernode))
                .attr("fill", (innernode.value() === root.value()) ? colorScheme.forRoot() : colorScheme.forNumber(innernode.value()));
            innernode = innernode.parent();
        }
        node = node.next();
    }
}