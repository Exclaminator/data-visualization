interface ColorScheme {
    forNumber(value: number): string;
    forRoot(): string;
    forHighlight(): string;
    getSchemeObjects();
    getModulo();
}

class ModuloColorScheme implements ColorScheme {
    private modulo: number;
    private readonly colors = [
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

    constructor(modulo: number) {
        this.changeModulo(modulo);
    }
    
    getModulo() {
        return this.modulo;
    }

    getSchemeObjects() {
        var objectstack = [];
        for(var i = 0; i < this.colors.length; i++) {
            objectstack[i] = {
                value: i,
                fill: this.colors[i]
            };
        }
        return objectstack;
    }

    changeModulo(newModulo: number) {
        if (newModulo - 1 > this.colors.length) {
            throw new Error(`ModuloColorScheme does not have enough colors to handle a modulo of this size. Available: ${this.colors.length}, given modulo: ${this.modulo}`);
        }
        this.modulo = newModulo;
    }

    forNumber(value: number): string {
        return this.colors[value % this.modulo];
    }

    forHighlight(): string {
        return this.forSpecial();
    }

    forRoot(): string {
        return "#000000";
    }

    forSpecial(offset?: number): string {
        if (offset === undefined) {
            offset = 0;
        }

        return this.colors[this.modulo + offset];
    }
}