import moment from "moment";
import Api from "./api/Api.interface";
import Employee from "./models/Employee";
import Manager from "./models/Manager";
import { SendMessageFn, sendMessageFactory } from "./slack/send-message";
import MaybeString from "./types/MaybeString";

type Staff = Employee[];

export default class BirthdaySlackBot {
    private sendMessage: SendMessageFn;

    constructor(
        private readonly api: Api,
        token: MaybeString,
        channel: MaybeString
    ) {
        if (!token) throw new Error("Slack token not specified");
        if (!channel) throw new Error("Slack channel not specified");

        this.sendMessage = sendMessageFactory(token, channel);
    }

    async run() {
        const managers = await this.api.fetch();

        const today = moment();
    
        for(const manager of managers) {
            const todayBirthdayStaff: Staff = new Array<Employee>();
    
            for(const employee of manager.staff) {
                if (this.isTodayBirthday(today, employee.birthday)) {
                    todayBirthdayStaff.push(employee);
                }
            }
    
            this.notifyManager(manager, todayBirthdayStaff);
        }
    }

    private isTodayBirthday(today: moment.Moment, dateToCheck: Date) {
        return today.date() === dateToCheck.getDate() && today.month() === dateToCheck.getMonth();
    }

    private notifyManager(manager: Manager, todayBirthdayStaff: Staff) {
        this.sendMessage(`Уведомление для ${manager.email}\n${this.getMessageBody(todayBirthdayStaff)}`);
    }

    private getMessageBody(todayBirthdayStaff: Staff) {
        if (todayBirthdayStaff.length) {
            return "Сегодня нет сотрудников, у которых день рождения.";
        }
    
        const listOfStaff = this.buildListOfStaff(todayBirthdayStaff);
        return `Список сотрудников, у которых сегодня день рождения:\n${listOfStaff}`;
    }

    private buildListOfStaff(staff: Staff) {
        return staff.map(({ name, email }) => `${name} (${email})`).join("\n");
    }
}