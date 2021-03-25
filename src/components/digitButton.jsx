import styles from "./digitButton.module.scss"

const DigitButton =({color,label,cb})=>(
    <div onClick={()=>cb(label)} className={styles.button}>
        <div style={{backgroundColor:color}}>
            <div style={{color:'gray'}}>{label}</div>
        </div>
    </div>
)

export default DigitButton