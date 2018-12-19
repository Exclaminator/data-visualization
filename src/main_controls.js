function changeNumColors(newNumColors) {
    colorScheme.changeModulo(parseInt(newNumColors));

    unlight();
    d3.select("#radial_tree")
        .selectAll("circle")
        .attr("fill", d => (d.data.value() === currentRoot.value())? colorScheme.forRoot() : colorScheme.forNumber(d.data.value()));

    highlight();
    showBreadcrumbs();
    barChart(currentRoot);
    showStem(currentRoot);
    inspect(currentRoot);
}

function updateRootToGiven() {
    var value = parseInt(d3.select("#rootSelector")._groups[0][0].value);
    if (value) {
        updateRoot(currentRoot.get(value));
    }
}

function changeTreeDepth(newTreeDepth) {
    redraw(currentRoot, barChart_numHorizontalElements, newTreeDepth)
}

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

function doneResizing(){
    redraw(currentRoot, barChart_numHorizontalElements, maxTreeDepthRelative)
}

// TODO: add conjecture input
function redraw(_root, _amount, _treeDepth) {
    barChart_numHorizontalElements = _amount;

    if (maxTreeDepthRelative != _treeDepth) {
        console.log(`new depth: ${_treeDepth}, old depth = ${maxTreeDepthRelative}`)
        maxTreeDepthRelative = _treeDepth;
    }

    makeRadialTree(_root);
    barChart(_root);
    showBreadcrumbs();
    showStem(_root);
    inspect(_root);
    showLegend(colorScheme);
}

/**
 *  @param newRoot The selected node, if same as current root will reset to previous root
 */
function updateRoot(newRoot) {
    /* store/load the root node */
    if (rootStack.length > 0 && newRoot === currentRoot) {
        // clicked on root
        const nod = rootStack.pop();
        makeRadialTree(nod);
        currentRoot = nod;
    } else {
        rootStack.push(currentRoot);
        makeRadialTree(newRoot);
        currentRoot = newRoot;
    }

    barChart(currentRoot);
    showBreadcrumbs();
    showStem(currentRoot);
    inspect(currentRoot);
}