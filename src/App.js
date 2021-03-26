/** @format */

import "./App.scss";
import DigitButton from "./components/digitButton";
import { useState, useRef } from "react";

const digitLabels = new Array(10).fill(null).map((_, i) => i);
const operators = ["+", "-", "*", "/", "(", ")", "C"];
digitLabels.push(".", ...operators);
const controls = ["<", "<-", ">"];
digitLabels.push(...controls);

const App = () => {
    const [output, setOutput] = useState("");
    const inp = useRef(null);
    const equal = useRef(null);

    const validKey = char => {
        const regexp = /[^\d|.|*|/|+|\-|(|)]/;
        return !regexp.test(char);
    };

    const handlerCb = x => {
        if (x === "C") {
            setOutput("");
            return;
        }
        const currentPosition = inp.current.selectionStart;
        const divide = output.slice(currentPosition);
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
        let color = /\d/.test(e) ? "black" : "red";
        if (e === "C") color = "blue";
        if (controls.includes(e)) color = "white";
        const element = (
            <DigitButton color={color} label={e} cb={handlerCb} key={"i" + e} />
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
                    />
                    <div
                        ref={equal}
                        className="equal"
                        // style={{ fontSize: font }}
                        onClick={() => {
                            inp.current.focus();
                            inp.current.selectionStart = inp.current.selectionEnd = 2;
                        }}>
                        ={postSet()}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="controls">
                    {distributeDigitLabels.filter(({ props: { label } }) =>
                        controls.includes(label),
                    )}
                </div>
                <div className="digits">
                    {distributeDigitLabels.filter(
                        ({ props: { label } }) =>
                            /\d/.test(label) || /\./.test(label),
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
