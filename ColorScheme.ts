interface ColorScheme {
    forNumber(value: number): string;
    forRoot(): string;
    forHighlight(): string;
}

class ModuloColorScheme implements ColorScheme {
    private readonly colorScheme = [
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

    constructor(private readonly modulo: number) {
        if (this.modulo - 1 > this.colorScheme.length) {
            throw new Error(`ModuloColorScheme does not have enough colors to handle a modulo of this size. Available: ${this.colorScheme.length}, given modulo: ${this.modulo}`);
        }
    }

    forNumber(value: number): string {
        return this.colorScheme[value % this.modulo];
    }

    forHighlight(): string {
        return this.forSpecial();
    }

    forRoot(): string {
        return "#000000";
    }



    forSpecial(offset?: number): string {
        if (!offset) {
            offset = 0;
        }

        return this.colorScheme[this.modulo + offset];
    }
}