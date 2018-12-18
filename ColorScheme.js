class ModuloColorScheme {
    constructor(modulo) {
        this.colors = [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#ffbb78",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5",
            "#8c564b",
            "#c49c94",
            "#e377c2",
            "#f7b6d2",
            "#7f7f7f",
            "#c7c7c7",
            "#bcbd22",
            "#dbdb8d",
            "#17becf",
            "#9edae5"
        ];
        this.changeModulo(modulo);
    }
    changeModulo(newModulo) {
        if (newModulo - 1 > this.colors.length) {
            throw new Error(`ModuloColorScheme does not have enough colors to handle a modulo of this size. Available: ${this.colors.length}, given modulo: ${this.modulo}`);
        }
        this.modulo = newModulo;
    }
    forNumber(value) {
        return this.colors[value % this.modulo];
    }
    forHighlight() {
        return this.forSpecial();
    }
    forRoot() {
        return "#000000";
    }
    forSpecial(offset) {
        if (offset === undefined) {
            offset = 0;
        }
        return this.colors[this.modulo + offset];
    }
}
