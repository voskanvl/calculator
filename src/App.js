/** @format */

import "./App.scss";
import DigitButton from "./components/digitButton";
import { useState, useRef, useEffect } from "react";

const digitLabels = [];
const digits = new Array(10).fill(null).map((_, i) => i);
digits.push(".");
digitLabels.push(...digits);
const operators = ["+", "-", "*", "/", "(", ")"];
digitLabels.push(...operators);
const controls = ["<", "<-", ">", "C"];
digitLabels.push(...controls);

const App = () => {
    const [output, setOutput] = useState("");
    const inp = useRef(null);

    useEffect(() => inp.current.focus(), []);

    const validKey = char => {
        const regexp = /[^\d|.|*|/|+|\-|(|)]/;
        return !regexp.test(char);
    };

    const handlerReducer = x => {
        const currentPosition = inp.current.selectionStart;
        const divide = output.slice(currentPosition);

        if (x === "C") {
            setOutput("");
            return;
        }
        if (controls.includes(x)) {
            switch (x) {
                case "<":
                    inp.current.selectionStart = inp.current.selectionEnd =
                        currentPosition - 1;
                    inp.current.focus();
                    break;
                case ">":
                    inp.current.selectionStart = inp.current.selectionEnd =
                        currentPosition + 1;
                    inp.current.focus();
                    break;
                case "<-":
                    if (currentPosition > 0) {
                        setOutput(
                            output.slice(0, currentPosition - 1) + divide,
                        );
                        inp.current.focus();
                        setTimeout(() => {
                            inp.current.selectionStart = inp.current.selectionEnd =
                                currentPosition - 1;
                        });
                    }
                    break;

                default:
                    break;
            }
            return;
        }

        setOutput(output.slice(0, currentPosition) + x + divide);
        inp.current.focus();
        setTimeout(() => {
            inp.current.selectionStart = inp.current.selectionEnd =
                currentPosition + 1;
        });
    };

    const handleInput = ({ target: { value } }) => {
        if (validKey(value)) setOutput(value);
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

    const distributeDigitLabels = digitLabels.map(e => {
        let color = digits.includes(e) ? "black" : "red";
        if (controls.includes(e)) color = "white";
        if (e === "C") color = "blue";
        const element = (
            <DigitButton
                color={color}
                label={e}
                cb={handlerReducer}
                key={"i" + e}
            />
        );
        return element;
    });

    return (
        <div className="main">
            <div className="wrap-output">
                <div className="output">
                    <input
                        ref={inp}
                        type="text"
                        placeholder="0"
                        onInput={handleInput}
                        value={output}
                        onBlur={() => inp.current.focus()}
                    />
                    <div className="equal">={postSet()}</div>
                </div>
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

//TODO: добавить кнопки перемещения по инпуту: вперед, назад, удалить
//TODO: при использовании на мобильном вылезает клавиатура при фокусе на инпуте и закрывает цифры
