import MaybeString from "./types/MaybeString"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SLACK_TOKEN: MaybeString,
            SLACK_CHANNEL: MaybeString,

            SCHEDULE_CRON_EXPRESSION: MaybeString,

            API_URL: MaybeString,
            MOCK_DATA_FILENAME: MaybeString
        }
    }
}

export {}