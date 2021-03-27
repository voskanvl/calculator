/** @format */

export const insert = (char, output) => {
    return (
        output.value.slice(0, output.pointer) +
        char +
        output.value.slice(output.pointer)
    );
};
