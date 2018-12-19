function showLegend(colorScheme) {
    d3.select("#legend").remove();
    d3.select("body").select("#toolrow")
        .append("svg")
        .attr("id", "legend")
        .attr("class", "col-md-6 nopadding")
        .attr("style", "padding: 0px;");

    const svg = d3.select("#legend");
    var fw = parseInt(svg.style("width"));
    var fh = parseInt(svg.style("height"));
    const shemeObjects = colorScheme.getSchemeObjects();
    const t = shemeObjects.length;
    const m = colorScheme.getModulo();
    const dx = fw / (t+1.5);


    var block = svg.selectAll("g").data(shemeObjects).enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (i+1.5) * dx + ", 0)"; });

    block.append("rect")
        .attr("width", dx)
        .attr("height", 30)
        .attr("fill", (d,i) => colorScheme.forNumber(i));

    block.append("text")
        .attr("x", d => (d.value > 9)? dx/2 - 8 : dx/2 - 3)
        .attr("y", 30 / 2)
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text(d => d.value);


    svg.append("rect")
        .datum([{value: "bloep"}])
        .attr("x", fw*m/t + dx/2)
        .attr("y", 0)
        .attr("width", 5)
        .attr("height", 30)
        .attr("r", 5)
        .attr("id", "slider")
        .attr("cursor", "ew-resize")
        .style("fill", "white")
        .style("stroke", "black")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    svg.append("text")
        .attr("x", 4)
        .attr("y", 30 / 2)
        .attr("dy", ".35em")
        .attr("fill", "black")
        .text("modulo:");

    function dragstarted(d) {
        d3.select("#slider").raise().classed("active", true);
    }

    function dragged(d) {
        d3.select("#slider").attr("x", d.x = Math.max(0, Math.min(d3.event.x, 19.8*dx)));
        let m = Math.ceil(d3.event.x/dx - 1.5);
        colorScheme.changeModulo(m);
        block.select("rect").attr("fill", (d, i) => { return colorScheme.forNumber(i)});
    }

    function dragended(d) {
        d3.select("#slider").classed("active", false);
        let m = Math.ceil(d3.event.x/dx);
        // d3.select("#slider").attr("x", d.x = Math.max(0, Math.min(m*dx, 19*dx)));
        changeNumColors(m);
    }

    // var drag = d3.behavior.drag()
    //     .origin(function(d) { return d; })
    //     .on("drag", dragmove);
    // var circle = svg.append("circle")
    //     .attr("r", radius)
    //     .attr("cy", function(d) { return d.y; })
    //     .attr("cx", function(d) { return d.x; })
    //     .style("cursor", "ew-resize")
    //     .call(drag);


    // for (var i = 0; i < m; i++) {
    //     g.append("rect")
    //         .attr("x", i*dx)
    //         .attr("y", 0)
    //         .attr("width", dx)
    //         .attr("height", 30)
    //         // .attr("title", innernode.value())
    //         // .attr("class", "bar"+innernode.value() + " cBar"+node.value())
    //         // .on("mouseover", (innernode => () => highlight(node, innernode))(innernode))
    //         // .on("click", (innernode => () => updateRoot(innernode))(innernode))
    //         .attr("fill", colorScheme.forNumber(i));
    // }
}