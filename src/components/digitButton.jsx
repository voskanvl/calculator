/** @format */

import styles from "./digitButton.module.scss";
const colors = [
    { value: "red", text: "black" },
    { value: "black", text: "white" },
    { value: "white", text: "black" },
    { value: "blue", text: "red" },
];

const DigitButton = ({ color, label, cb }) => {
    if (colors.map(color => color.value).includes(color)) {
        const text = colors.filter(e => e.value === color)[0];
        return (
            <div onClick={() => cb(label)} className={styles.button}>
                <div style={{ backgroundColor: color }}>
                    <div style={{ color: text.text }}>{label}</div>
                </div>
            </div>
        );
    } else {
        return <div>Не установленный цвет</div>;
    }
};

export default DigitButton;
