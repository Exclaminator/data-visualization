
//////
// mouse-in and -out functions
//////

/**
 * Usage: highlight(node) when hovering over node in tree, highlight(node, inner) when hovering over the barchart
* @param node "the element of the column (topmost) i.e. elem that generates the column"
* @param innernode "the element in the column you're hovering over"
*/
function highlight(node, innernode) {

    // save what is going to be highlighted
    if (node){
        this.highlighted = node;
    }

    // nothing highlighted, so nothing to do
    if (this.highlighted === undefined) {
        return;
    }


    // handle missing innernode arg (highlight node in tree and whole bar in barchart)
    if (!innernode) {
        innernode = this.highlighted;
    }

    // sticky-highlighting: unlight everything only on new highlight command
    unlight();

    let nd = this.highlighted;
    for (var i = 0; i <= this.highlighted.depth(); i++) {
        let color = nd.value() === innernode.value() ? colorScheme.forSpecial(0) : colorScheme.forSpecial(1);

        d3.select("#radial_tree").select("#circle"+nd.value()).style("stroke", color);
        d3.select("#barchart").selectAll(".bar"+nd.value()).style("stroke", color);
        nd = nd.parent();
    }
    inspect(innernode);
}

function unlight() {
    d3.select("#radial_tree").selectAll("circle").style("stroke", "none");
    d3.select("#barchart").selectAll("rect").style("stroke", "none");
}