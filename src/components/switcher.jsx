/** @format */
import styles from "./switcher.module.scss";
import { useState, useEffect } from "react";

const Switcher = ({ sw }) => {
    const [turn, setTurn] = useState(0);
    const [moved, setMoved] = useState(false);
    useEffect(() => {
        sw(turn);
    }, [turn, sw]);
    useEffect(() => {
        setMoved(true);
        console.log(moved);
        return () =>
            setTimeout(() => {
                setMoved(false);
                console.log(moved);
            }, 100);
    }, [turn]);
    const handle = () => {
        setTurn((turn + 1) % 5);
    };

    return (
        <div>
            <div className={styles.circle} onClick={handle}>
                <div className={styles.sign}>
                    <strong style={{ left: `${(turn - 1) * 27 - 15}px` }}>
                        {new Array(5)
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
