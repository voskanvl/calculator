/** @format */

import { insert } from "../insert";

const Output = ({ output }) => {
    // const inp = useRef(null);
    // useEffect(() => inp.current.focus(), []);
    let { value, pointer } = output;
    const right = value.slice(0, pointer);
    const left = value.slice(pointer);
    console.log("🚀 ~ output", output, right, left);

    const renderValue = (
        <div>
            {right}
            <span className="pointer">|</span>
            {left}
        </div>
    );
    console.log("🚀 ~ renderValue", renderValue);

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
            {/* <input
                className="input"
                ref={inp}
                type="text"
                placeholder="0"
                onInput={event => input({ event, inp: inp.current })}
                value={value}
                onBlur={() => inp.current.focus()}
            /> */}
            <div className="input">{renderValue}</div>
            <div className="equal">={postSet()}</div>
        </div>
    );
};

export default Output;

//TODO: перенести стиль из Апп сюда
//TODO: инпут должен автоматически скролиться при введении новых символов
