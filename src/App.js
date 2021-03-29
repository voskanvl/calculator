/** @format */

import "./App.scss";
import DigitButton from "./components/digitButton";
import Switcher from "./components/switcher";
import Output from "./components/output";
import { useReducer, useState } from "react";
import { reducer } from "./reducer";

const digitLabels = [];
const digits = new Array(10).fill(null).map((_, i) => i);
digits.push(".");
digitLabels.push(...digits);
const operators = ["+", "-", "*", "/", "(", ")"];
digitLabels.push(...operators);
const controls = ["◀︎◀︎", "◀︎", "⌫", "►", "►►", "C"];
digitLabels.push(...controls);

const App = () => {
    const [output, dispatch] = useReducer(reducer, { value: "", pointer: 0 });
    const [fixed, setfixed] = useState(0);

    const distributeDigitLabels = digitLabels.map(e => {
        let color = digits.includes(e) ? "black" : "red";
        if (controls.includes(e)) color = "white";
        if (e === "C") color = "blue";
        const element = (
            <DigitButton
                color={color}
                label={e}
                cb={x => dispatch({ value: x })}
                key={"i" + e}
            />
        );
        return element;
    });

    const handleSw = x => {
        localStorage.setItem("turn", x);
        setfixed(x);
    };

    return (
        <div
            className="main"
            onSelect={e => {
                e.preventDefault();
                console.log("select");
            }}>
            <div className="wrap-output">
                <Output output={output} fixed={fixed} />
            </div>
            <div className="container">
                <div className="controls">
                    {distributeDigitLabels.filter(({ props: { label } }) =>
                        controls.includes(label),
                    )}
                </div>
                <div className="switch">
                    <Switcher sw={handleSw} />
                </div>
                <div className="digits">
                    {distributeDigitLabels.filter(({ props: { label } }) =>
                        digits.includes(label),
                    )}
                </div>
                <div className="operators">
                    {distributeDigitLabels.filter(({ props: { label } }) =>
                        operators.includes(label),
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
