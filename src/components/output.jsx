/** @format */

import { useRef, useEffect } from "react";
import styles from "./output.module.scss";

const Output = ({ output, fixed = 0 }) => {
    // const inp = useRef(null);
    // useEffect(() => inp.current.focus(), []);
    let { value, pointer } = output;
    let left = value.slice(0, pointer);
    let current = value.slice(pointer, pointer + 1);
    let right = value.slice(pointer + 1);
    if (pointer === value.length) {
        left = value.slice();
        current = <span className={styles.pointerRight}>_</span>;
        right = "";
    }
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
        <div className={styles.output}>
            <div className={styles.input}>
                {left}
                <span className={styles.pointer} ref={caret}>
                    {current}
                </span>
                {right}
            </div>
            <div className={styles.equal}>={postSet()}</div>
        </div>
    );
};

export default Output;

//TODO: перенести стиль из Апп сюда
