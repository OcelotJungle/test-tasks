import styles from "./message.module.css";
import cn from "classnames";

export default function Message({ author, text, type }) {
    return (
        <div>
            <h4 className={cn(styles.inline, styles.author)}>{ author }</h4>
            <p className={cn(styles.inline, { [styles.status]: type === "status" })}>{ text }</p>
            <br />
        </div>
    );
}