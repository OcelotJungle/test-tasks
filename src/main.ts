import dotenv from "dotenv";
dotenv.config();

if (!process.env.SCHEDULE_CRON_EXPRESSION) throw new Error("Schedule cron expression not specified");

import cron from "node-cron";
import MockApi from "./api/MockApi";
import FetchApi from "./api/FetchApi";
import BirthdaySlackBot from "./BirthdaySlackBot";

const dev = process.env.NODE_ENV?.trim() === "development";

const bot = new BirthdaySlackBot(
    dev ? new MockApi(process.env.MOCK_DATA_FILENAME) : new FetchApi(process.env.API_URL),
    process.env.SLACK_TOKEN,
    process.env.SLACK_CHANNEL
)

cron.schedule(process.env.SCHEDULE_CRON_EXPRESSION, bot.run.bind(bot));

console.log(`Birthday Slack Bot has successfully started!${dev ? " (dev mode)" : ""}`);
console.log(`Schedule cron expression: ${process.env.SCHEDULE_CRON_EXPRESSION}`);