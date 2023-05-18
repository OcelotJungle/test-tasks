import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";

const { SCHEDULE_CRON_EXPRESSION: cronSchedule } = process.env;

if (!cronSchedule) throw new Error("Schedule cron expression not specified");
if (!cron.validate(cronSchedule)) throw new Error("Schedule cron expression is invalid");

import BirthdaySlackBot from "./BirthdaySlackBot";
import { FetchApi, MockApi } from "./api";
import { SlackNotifier, MockNotifier } from "./notifiers";

function getBot(dev: boolean) {
    if (!dev) {
        const {
            API_URL,
            SLACK_TOKEN,
            SLACK_CHANNEL
        } = process.env;

        return new BirthdaySlackBot(
            new FetchApi(API_URL),
            new SlackNotifier(SLACK_TOKEN, SLACK_CHANNEL)
        );
    }

    const { MOCK_DATA_FILENAME } = process.env;
    return new BirthdaySlackBot(new MockApi(MOCK_DATA_FILENAME), new MockNotifier());
}

const dev = process.env.NODE_ENV?.trim() === "development";
const bot = getBot(dev);

cron.schedule(cronSchedule, bot.run.bind(bot), { runOnInit: dev });

console.log(["Birthday Slack Bot has successfully started!", dev ? "(dev mode)" : null].join(" "));
console.log(`Schedule cron expression: ${cronSchedule}`);