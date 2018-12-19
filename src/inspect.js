function inspect(nd) {
    // const nd = currentRoot.get(parseInt(number));

    d3.select("#inspection").remove();
    d3.select("#toolrow").insert("svg", "#legend")
        .attr("id", "inspection")
        .attr("class", "col-md-3 no-padding")
        .attr("style", "height: 30px; padding: 0px;");

    const svg = d3.select("#inspection");

    let fw = parseInt(svg.style("width"));
    // const dx = fw/5;
    const dx = fw;
    let fh = parseInt(svg.style("height"));

    // var show = [];
    // if(nd.prev()) {
    //     if(nd.prev().prev()) {
    //         show[0] = nd.prev().prev();
    //     } else {
    //         show[0] = null;
    //     }
    //     show[1] = nd.prev();
    // } else {
    //     show[0] = null;
    //     show[1] = null;
    // }
    // show[2] = nd;
    // show[3] = nd.next();
    // show[4] = nd.next().next();

    // var objectstack = show.map(node => {
    //     if (node != null) {
    //         return {text: node.value(), depth: node.depth(), fill: colorScheme.forNumber(node.value())};
    //     } else {
    //         return {text: "", depth: "", fill: "none"};
    //     }
    // });

    var block = svg.selectAll("g")
        .data([{text: nd.value(), depth: nd.depth(), fill: colorScheme.forNumber(nd.value())}])
        .enter().append("g")
        .attr("transform", (d, i) => `translate(${i * dx}, 0)`);

    block.append("rect")
        .attr("width", dx)
        .attr("height", 30)
        .attr("fill", d => d.fill);

    block.append("text")
        .attr("x", d => (d.text > 9)? dx/2 - 8 : dx/2 - 3)
        .attr("y", 10)
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text(function(d) { return d.text; });

    block.append("text")
        .attr("x", 0)
        .attr("y", 22)
        .attr("dy", 5)
        .attr("fill", "black")
        .text(d => d.depth);
}