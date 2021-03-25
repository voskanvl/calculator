/** @format */

import "./App.scss";
import DigitButton from "./components/digitButton";
import { useState, useRef } from "react";

const arr = new Array(9).fill(null).map((_, i) => i);
arr.push(".", "9", "+", "-", "*", "/", "(", ")");

const App = () => {
    const [output, setOutput] = useState("");
    const [first, setFirst] = useState(true);
    const inp = useRef(null);

    const validKey = char => {
        const regexp = /[\d|.|*|\/|+|\-|\(|\)]/;
        return regexp.test(char);
    };

    const handlerCb = x => {
        const currentPosition = inp.current.selectionStart;
        const divide = output.slice(currentPosition);
        setOutput(output.slice(0, currentPosition) + x + divide);
        inp.current.focus();
        setTimeout(() => {
            inp.current.selectionStart = inp.current.selectionEnd =
                currentPosition + 1;
        });
    };

    const handleBackspace = () => {
        setOutput(output.slice(0, -1));
    };
    const handleKeyDown = e => {
        e.preventDefault();
        const { key } = e;
        console.log(key, typeof key);
        if (key === "Backspace") {
            handleBackspace();
            return;
        }
        if (validKey(key)) {
            console.log("First", first);
            setOutput(output + key);
            if (first && key === "0") {
                setOutput("0.");
            }
            setFirst(false);
        }
    };
    const handleInput = e => {
        setOutput(e.target.value);
        console.log(e.target.selectionStart);
    };

    const postSet = () => {
        let result = 0;
        try {
            result = eval(output);
            return result;
        } catch (error) {
            return <span style={{ color: "#f77a" }}>Error</span>;
        }
    };

    const handleKeyDown1 = e => {
        console.log(e.target.selectionStart);
    };

    return (
        <div className="main">
            <div className="output">
                <input
                    ref={inp}
                    type="text"
                    placeholder="0"
                    onKeyDown={handleKeyDown1}
                    onInput={handleInput}
                    value={output}
                />
                <div
                    className="equal"
                    onClick={() => {
                        inp.current.focus();
                        inp.current.selectionStart = inp.current.selectionEnd = 2;
                    }}>
                    ={postSet()}
                </div>
            </div>
            <div className="container">
                {arr.map(e => {
                    let color = /\d/.test(e) ? "black" : "red";
                    return (
                        <DigitButton
                            color={color}
                            label={e}
                            cb={handlerCb}
                            key={"i" + e}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
