/** @format */
import { insert } from "./insert";
export function reducer(output, action) {
    switch (action.value) {
        case "<":
            if (output.pointer > 0) {
                return {
                    ...output,
                    pointer: output.pointer - 1,
                };
            } else {
                return {
                    ...output,
                    pointer: 0,
                };
            }
        case ">":
            if (output.pointer < output.value.length) {
                return {
                    ...output,
                    pointer: output.pointer + 1,
                };
            } else {
                return {
                    ...output,
                    pointer: output.value.length,
                };
            }
        case "<-":
            return {
                value:
                    output.value.slice(0, output.pointer - 1) +
                    output.value.slice(output.pointer),
                pointer: output.pointer - 1,
            };
        case "<<":
            return {
                ...output,
                pointer: 0,
            };
        case ">>":
            return {
                ...output,
                pointer: output.value.length,
            };
        case "C":
            return {
                value: "",
                pointer: 0,
            };

        default:
            break;
    }
    return {
        value: insert(action.value, output),
        pointer: output.pointer + 1,
    };
}
