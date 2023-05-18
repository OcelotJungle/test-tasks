import { Notifier } from ".";

class MockNotifier implements Notifier {
    sendMessageFactory() {
        return async function sendMessage(text: string) {
            console.log("\nMock notification:");
            console.log(text);
        }
    }
}

export default MockNotifier;