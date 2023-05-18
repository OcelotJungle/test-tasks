import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";

const { SCHEDULE_CRON_EXPRESSION: cronSchedule } = process.env;

if (!cronSchedule) throw new Error("Schedule cron expression not specified");
if (!cron.validate(cronSchedule)) throw new Error("Schedule cron expression is invalid");

import BirthdayNotificationBot from "./BirthdayNotificationBot";
import { Api, FetchApi, MockApi } from "./api";
import { SlackNotifier, MockNotifier, Notifier } from "./notifiers";

function getApi() {
    if (process.argv.includes("--mock-api")) {
        return new MockApi(process.env.MOCK_DATA_FILENAME);
    }

    return new FetchApi(process.env.API_URL);
}

function getNotifier() {
    if (process.argv.includes("--mock-notifier")) {
        return new MockNotifier();
    }

    return new SlackNotifier(
        process.env.SLACK_TOKEN,
        process.env.SLACK_CHANNEL
    );
}

const dev = process.argv.includes("--dev");

const api = getApi();
const notifier = getNotifier();
const bot = new BirthdayNotificationBot(api, notifier);

cron.schedule(cronSchedule, bot.run.bind(bot), { runOnInit: dev });

console.log("Birthday Notification Bot has successfully started!");
console.log(`\
Dev mode: ${dev}; \
api: ${api instanceof MockApi ? "mock" : "fetch"}; \
notifier: ${notifier instanceof MockNotifier ? "mock" : "slack"}`);
console.log(`Schedule cron expression: ${cronSchedule}`);