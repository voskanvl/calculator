/** @format */

import { useRef, useEffect } from "react";

const Output = ({ output, fixed = 0 }) => {
    // const inp = useRef(null);
    // useEffect(() => inp.current.focus(), []);
    let { value, pointer } = output;
    const right = value.slice(0, pointer);
    const left = value.slice(pointer);
    const caret = useRef(null);

    useEffect(() => {
        caret.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }, [pointer]);

    const equalsModes = [
        { func: "toFixed", arg: 0 },
        { func: "toFixed", arg: 2 },
        { func: "toFixed", arg: 4 },
        { func: "toExponential", arg: 2 },
        { func: "toExponential", arg: 4 },
    ];

    const postSet = () => {
        let result = 0;
        try {
            result = eval(value);
            return Number.prototype[equalsModes[fixed].func].call(
                result || 0,
                equalsModes[fixed].arg,
            );
        } catch (error) {
            return <span style={{ color: "#f77a" }}>E</span>;
        }
    };
    return (
        <div className="output">
            <div className="input">
                {right}
                <span className="pointer" ref={caret}>
                    |
                </span>
                {left}
            </div>
            <div className="equal">={postSet()}</div>
        </div>
    );
};

export default Output;

//TODO: перенести стиль из Апп сюда
//TODO toFixed(?) equal
