/** @format */

import "./App.scss";
import DigitButton from "./components/digitButton";
import Output from "./components/output";
import { useReducer } from "react";
import { insert } from "./insert";

const digitLabels = [];
const digits = new Array(10).fill(null).map((_, i) => i);
digits.push(".");
digitLabels.push(...digits);
const operators = ["+", "-", "*", "/", "(", ")"];
digitLabels.push(...operators);
const controls = ["<<", "<", "<-", ">", ">>", "C"];
digitLabels.push(...controls);

const App = () => {
    const initialOutput = { value: "", pointer: 0 };

    function reducer(output, action) {
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
                return output;

            default:
                break;
        }
        return {
            value: insert(action.value, output),
            pointer: output.pointer + 1,
        };
    }

    const [output, dispatch] = useReducer(reducer, initialOutput);

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

    return (
        <div className="main">
            <div className="wrap-output">
                <Output output={output} />
            </div>
            <div className="container">
                <div className="controls">
                    {distributeDigitLabels.filter(({ props: { label } }) =>
                        controls.includes(label),
                    )}
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

//TODO: при использовании на мобильном вылезает клавиатура при фокусе на инпуте и закрывает цифры
//TODO: доделать управляющие сигналы
