import { WebClient } from "@slack/web-api";
import { Notifier } from ".";
import { MaybeString } from "../types";

class SlackNotifier implements Notifier {
    private token: string;
    private channel: string;

    constructor(
        token: MaybeString,
        channel: MaybeString
    ) {
        if (!token) throw new Error("Slack token not specified");
        if (!channel) throw new Error("Slack channel not specified");

        this.token = token;
        this.channel = channel;
    }

    sendMessageFactory() {
        const web = new WebClient(this.token);
        const channel = this.channel;

        return async function sendMessage(text: string) {
            try { await web.chat.postMessage({ channel, text }) }
            catch(e) { console.error(e); }
        }
    }
}

export default SlackNotifier;