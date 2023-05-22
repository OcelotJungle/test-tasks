import { WebClient } from "@slack/web-api";
import { Rukovoditel, Sotrudniki } from "./types";
import axios from "axios";

const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;
const WHICH_HOUR_TO_RUN = 9;
const BIRTHDAYS_API_URL = "http://test.test/?getbd";

function main() {
    const now = new Date().getTime();
    const nowDayStart = now - (now % MS_IN_DAY);
    const firstRun = nowDayStart + MS_IN_DAY + WHICH_HOUR_TO_RUN * MS_IN_HOUR;

    function isBirthdayFactory(now: Date) {
        const date = `0${now.getDate()}`.slice(-2);
        const month = `0${now.getMonth() + 1}`.slice(-2);
        const today = `${date}.${month}`;

        return function(birthday: string) {
            return today === birthday.substring(0, 6);
        }
    }

    function getTodayBirthdaysFactory(isBirthday: ReturnType<typeof isBirthdayFactory>) {
        return function(workers: Sotrudniki) {
            return Object.values(workers).filter(({ birthday }) => isBirthday(birthday));
        }
    }

    function sendMessageFactory(token: string = "", channel: string = "") {
        const web = new WebClient(token);

        return function(text: string) {
            web.chat.postMessage({ channel, text });
        }
    }

    async function run() {
        const response = await axios.get(BIRTHDAYS_API_URL);
        const data = response.data as Rukovoditel[];

        const isBirthday = isBirthdayFactory(new Date());
        const getTodayBirthdays = getTodayBirthdaysFactory(isBirthday);
        const sendMessage = sendMessageFactory(process.env.TOKEN, process.env.CHANNEL);

        for(const { rukovoditel: email, sotrudniki: workers } of data) {
            const todayBirthdays = getTodayBirthdays(workers);
            
            if (todayBirthdays.length) {
                const listOfWorkers = Object.values(workers).map(w => `${w.name} (${w.email})`).join("\n");
                sendMessage(`${email}, сегодня день рождения у:\n${listOfWorkers}`);
            }
        }
    }

    setTimeout(() => {
        run();
        setInterval(run, MS_IN_DAY);
    }, firstRun - now);
}