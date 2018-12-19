function makeRadialTree(collatzNode) {
    var svg = d3.select("#radial_tree");
    const width = parseInt(svg.style("width"));
    const height = width;
    const radius = width / 2 - 60;
    const dy = 30;
    const dx = 10;

    let tree = data => d3.tree()
        .size([Math.PI * 2, radius])
        .separation((a, b) => (a.parent.name === b.parent.name ? 1 : 2) / a.depth)
        (d3.hierarchy(data, d => {
            if (d.depth() < maxTreeDepthRelative + collatzNode.depth() - Math.log(d.depth())) { // + collatzNodeAsRoot.depth()) {
                return d.children();
            } else {
                return null;
            }
        }));

    const root = tree(collatzNode);

    d3.select("#radial_tree").remove();
    d3.select("body").select("#visrow")
        .insert("svg", "#barchart")
        .attr("id", "radial_tree")
        .attr("class", "col-md-5");
    

    svg = d3.select("#radial_tree")
        .style("height", "100%")
        .style("padding", "10px")
        .style("box-sizing", "border-box")
        .style("font", "10px sans-serif");

    const g = svg.append("g");

    const link = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links()).enter()
            .append("path")
            .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants().reverse())
        .enter().append("g")
        .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);
    
    node.append("circle")
        .attr("fill", d => (d === root)? colorScheme.forRoot() : colorScheme.forNumber(d.data.value()))
        .attr("r", 7)
        .attr("id", d => "circle" + d.data.value());

    function isEven(n) {
        return !(n & 1);
    }

    node.append("text")
        .attr("dy", d => {
            if (!d.children) {
                return "0.4em";
            }
            return isEven(d.depth) ? "-0.5em" : "1.2em"
        })
        .attr("x", d => d.x < Math.PI ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
        .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        .text(d => d.data.value())
        .clone(true).lower()
        .attr("stroke", "white")
        .attr("text-align", "left");

    const box = g.node().getBBox();
    
    svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
        
    // update onclick and mouse events here.
    d3.select("#radial_tree").selectAll("circle")
        .attr("cursor", "pointer")
        .on("mouseover", d => highlight(d.data))
        .on("click", d => updateRoot(d.data));

    return svg.node();
}