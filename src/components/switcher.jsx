/** @format */
import styles from "./switcher.module.scss";
import { useState, useEffect } from "react";

const Switcher = ({ sw, modeValue = 5 }) => {
    const initialTurn = localStorage.getItem("turn");
    const [turn, setTurn] = useState(parseInt(initialTurn) ?? 0);

    useEffect(() => {
        sw(turn);
    }, [turn, sw]);

    const handle = () => {
        setTurn((turn + 1) % modeValue);
    };

    return (
        <div>
            <div className={styles.circle} onClick={handle}>
                <div className={styles.sign}>
                    <strong style={{ left: `${(turn - 1) * 27 - 15}px` }}>
                        {new Array(modeValue)
                            .fill(null)
                            .map((_, i) => (
                                <span key={i} data-key={i}>
                                    {i}
                                </span>
                            ))
                            .reverse()}
                    </strong>
                </div>
                <div className={styles.container}>
                    <div
                        className={styles.switch}
                        style={{ transform: `rotate(${turn * 45}deg)` }}></div>
                </div>
            </div>
        </div>
    );
};
export default Switcher;
