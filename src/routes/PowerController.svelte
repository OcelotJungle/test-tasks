<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createMqttClient, type MqttClient } from "../lib/mqttClient";
    import { API_ENDPOINT_POWER, MQTT_BROKER_HOST, MQTT_BROKER_PORT, MQTT_POWER_TOPIC } from "$lib/consts";

    let power = 50;
    let mqttClient: MqttClient;

    onMount(() => mqttClient = createMqttClient(
        MQTT_BROKER_HOST, 
        MQTT_BROKER_PORT, 
        MQTT_POWER_TOPIC, 
        handleMqttMessage
    ));
    onDestroy(() => mqttClient?.disconnect());

    function handleMqttMessage(message: string) {
        const newPower = parseInt(message, 10);
        if(Math.abs(power - newPower) >= 1) power = newPower;
    }

    async function handlePowerChange(event: any) {
        power = +event.target.value;
        mqttClient?.publish(power.toString());
        await fetch(API_ENDPOINT_POWER, {
            method: "POST", 
            body: JSON.stringify({ power }) 
        });
    }

    async function loadPower() {
        const response = await fetch(API_ENDPOINT_POWER);
        const json = await response.json();
        power = json.power;
    }
</script>

<div class="content">
    {#await loadPower()}
        <p>Загрузка...</p>
    {:then _} 
        <h1>Мощность:</h1>
        <p>{Math.floor(power)}%</p>
        <input 
            type="range" 
            id="range" 
            min={0} max={100} step={1} 
            value={power} 
            on:change={handlePowerChange} 
            disabled={!mqttClient}
        /> 
    {/await}
</div>

<style>
    .content {
        text-align: center;
        max-width: 800px;
        padding: 20px;
        background-color: lightyellow;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }

    h1, p {
        margin: 0;
    }

    p {
        font-size: 4em;
        line-height: 1.5;
    }
</style>