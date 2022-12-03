import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setConnectedAction } from "../../store/reducers/connection-reducer";
import { WsContext } from "../../App";
import styles from "./login.module.css";

export default function Login() {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);
    const { setWs } = useContext(WsContext);

    const connect = () => {
        if(!value || isConnecting) return;

        setIsConnecting(true);

        const host = process.env.NODE_ENV === "production" ? window.location.host : `${window.location.hostname}:3001`;
        const wsUrl = `ws://${host}/?nickname=${value}`;
        
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            // alert("Websocket connection opened!");

            dispatch(setConnectedAction());
            setIsConnecting(false);
            setWs(ws);

            ws.onerror = undefined;
        }

        ws.onerror = () => {
            alert("Connection wasn't established");
            setIsConnecting(false);
        }
    }

    return (
        <div className={styles.container}>
            <input className={styles.nickname} type="text" value={value} onChange={evt => setValue(evt.target.value)} />
            <button className={styles.connectButton + ` ${(!value || isConnecting) ? "inactive" : ""}`} onClick={connect}>Connect</button>
        </div>
    );
}