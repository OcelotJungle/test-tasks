import mqtt from "mqtt/dist/mqtt";

export type MqttClient = {
    publish: (message: string) => void;
    disconnect: () => void;
}

export function createMqttClient(
    host: string, 
    port: number, 
    topic: string, 
    messageCallback: any
) {
    const client = mqtt.connect(`wss://${host}:${port}`);
    
    client.on("connect", () => {
        console.log("MQTT client connected");
        client.subscribe(topic, err => !err && console.log(`Subscribed to ${topic}`));
    });
    
    client.on("message", (topic, message) => {
        console.log(`Received message on ${topic}: ${message.toString()}`);
        messageCallback(message.toString());
    });
    
    return {
        publish: (message: string) => {
            console.log(`Published message on ${topic}: ${message}`);
            client.publish(topic, message);
        },
        disconnect: () => {
            console.log("MQTT client disconnected");
            client.unsubscribe(topic).end();
        }
    }
}
