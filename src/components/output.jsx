/** @format */

import { useRef, useEffect } from "react";

const Output = ({ output }) => {
    // const inp = useRef(null);
    // useEffect(() => inp.current.focus(), []);
    let { value, pointer } = output;
    const right = value.slice(0, pointer);
    const left = value.slice(pointer);
    const caret = useRef(null);

    useEffect(() => {
        caret.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }, [pointer]);

    const postSet = () => {
        let result = 0;
        try {
            result = eval(value);
            return result;
        } catch (error) {
            return <span style={{ color: "#f77a" }}>Error</span>;
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
