const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 24 * 60 * 60 * 1000 * 365],
    ["month", (24 * 60 * 60 * 1000 * 365) / 12],
    ["day", 24 * 60 * 60 * 1000],
    ["hour", 60 * 60 * 1000],
    ["minute", 60 * 1000],
    ["second", 1000]
];

export function toRelativeLocalDateWithUnit(
    date: Date,
    language: string
): { value: string; unit: Intl.RelativeTimeFormatUnit; unitValue: number } {
    const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
    const elapsed = date.getTime() - new Date().getTime();
    for (const [unit, value] of units) {
        if (Math.abs(elapsed) > value) {
            return {
                value: formatter.format(Math.ceil(elapsed / value), unit),
                unit,
                unitValue: value
            };
        }
    }
    return {
        value: formatter.format(Math.ceil(elapsed / 1000), "second"),
        unit: "second",
        unitValue: 1000
    };
}

export function toRelativeLocalDate(date: Date, language: string): string {
    return toRelativeLocalDateWithUnit(date, language).value;
}
