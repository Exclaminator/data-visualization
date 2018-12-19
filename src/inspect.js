function inspect(nd) {
    // const nd = currentRoot.get(parseInt(number));

    d3.select("#inspection").remove();
    d3.select("#toolrow").insert("svg", "#legend")
        .attr("id", "inspection")
        .attr("class", "col-md-2 no-padding")
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
        .attr("x", fw-100)
        .attr("y", 15)
        .attr("dy", 5)
        .attr("fill", "black")
        .text(d => "depth:" + d.depth);
        
    block.append("text")
        .attr("x", 20)
        .attr("y", 15)
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text(d => "value: "+d.text);

    
    svg.append("rect")
        .attr("x", fw-1)
        .attr("y", 0)
        .attr("width", 1)
        .attr("height", 30)
        .attr("fill", "black");
}