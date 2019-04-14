import { Units } from "./Units";

export function formatSizeAndUnits(size: number, units: Units): { formattedSize: string, formattedUnits: string } {

    let formattedSize: string;
    let formattedUnits: string;

    if (size < 1e+3) {
        formattedSize = size.toString();
        formattedUnits = units.byte
    }
    else if (size >= 1e+3 && size < 1e+6) {
        formattedSize = (size / 1e+3).toFixed(2)
        formattedUnits = units.kilobyte
    }
    else if (size >= 1e+6 && size < 1e+9) {
        formattedSize = (size / 1e+6).toFixed(2)
        formattedUnits = units.megabyte
    }
    else if (size >= 1e+9 && size < 1e+12) {
        formattedSize = (size / 1e+9).toFixed(2)
        formattedUnits = units.gigabyte
    }
    else {
        formattedSize = (size / 1e+12).toFixed(2)
        formattedUnits = units.terabyte
    }

    return { formattedSize, formattedUnits };
}