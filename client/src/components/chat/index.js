import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WsContext } from "../../App";
import { addMessageAction, selectMessages } from "../../store/reducers/chat-reducer";
import { setDisconnectedAction } from "../../store/reducers/connection-reducer";
import Message from "../message";
import cn from "classnames";
import styles from "./chat.module.css";

export default function Chat() {
    const { ws, setWs } = useContext(WsContext);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);
    const messageBoxRef = useRef();

    useEffect(() => {
        if(!ws) return;

        ws.onmessage = ({ data }) => dispatch(addMessageAction(JSON.parse(data)));
        ws.onerror = () => alert("Something went wrong with websocket");
        ws.onclose = () => {
            dispatch(setDisconnectedAction());
            setWs(null);
        }
    }, [ws, setWs, dispatch]);

    useEffect(() => { messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight }, [messages.length]);

    const [text, setText] = useState("");
    const send = () => {
        if(!text) return;

        ws.send(text);
        setText("");
    }

    return (
        <div className={styles.container}>
            <div ref={messageBoxRef} className={styles.messageBox}>
                { messages.map((message, i) => <Message key={i} { ...message } />) }
            </div>
            <textarea className={styles.textarea} value={text} onChange={evt => setText(evt.target.value)} />
            <button className={cn(styles.sendButton, { "inactive": !text })} onClick={send}>SEND</button>
        </div>
    );
}