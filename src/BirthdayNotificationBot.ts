import moment from "moment";
import { Api } from "./api";
import { Notifier } from "./notifiers";
import { SendMessageFn } from "./types";
import { Employee, Manager } from "./models";

type Staff = Employee[];

export default class BirthdayNotificationBot {
    private sendMessage: SendMessageFn;

    constructor(
        private readonly api: Api,
        notifier: Notifier,
    ) {
        this.sendMessage = notifier.sendMessageFactory();
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
            const listOfStaff = this.buildListOfStaff(todayBirthdayStaff);
            return `Список сотрудников, у которых сегодня день рождения:\n${listOfStaff}`;
        }
        
        return "Сегодня нет сотрудников, у которых день рождения.";
    }

    private buildListOfStaff(staff: Staff) {
        return staff.map(({ name, email }) => `${name} (${email})`).join("\n");
    }
}