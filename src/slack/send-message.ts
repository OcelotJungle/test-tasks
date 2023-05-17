import { WebClient } from "@slack/web-api"

type SendMessageFn = (message: string) => Promise<void>;

function sendMessageFactory(token: string, channel: string): SendMessageFn {
    const web = new WebClient(token);

    return async function sendMessage(text: string) {
        try { await web.chat.postMessage({ channel, text }) }
        catch(e) { console.error(e); }
    }
}

export { sendMessageFactory, SendMessageFn }