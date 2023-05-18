import { SendMessageFn } from "../types";

interface Notifier {
    sendMessageFactory(): SendMessageFn;
}

export default Notifier;