/** @format */
import styles from "./switcher.module.scss";
import { useState, useEffect } from "react";

const Switcher = ({ sw }) => {
    const [turn, setTurn] = useState(0);
    useEffect(() => {
        sw(turn);
    }, [turn, sw]);
    const handle = () => {
        setTurn((turn + 1) % 5);
    };

    return (
        <div>
            <div className={styles.circle} onClick={handle}>
                <div className={styles.sign}>
                    <strong>{turn}</strong>
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
