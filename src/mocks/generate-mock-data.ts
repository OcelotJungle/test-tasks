import dotenv from "dotenv";
dotenv.config();

const { MOCK_DATA_FILENAME } = process.env;

if (!MOCK_DATA_FILENAME) throw new Error("Mock data filename not specified");

import moment from "moment";
import { writeFile } from "fs/promises";
import { convertModelsToApiFormat } from "../converters/models-to-api-format";
import { Employee, Manager } from "../models";

const MANAGER_NAMES = ["John", "Pol"];
const EMAIL_DOMAIN = "foxford.ru";
const BIRTHDAY_YEAR = 2001;

async function generateMockData() {
    const staff = new Array<Employee>(365);

    for(let i = 0; i < 365; i++) {
        const birthday = getIthDayOfYear(BIRTHDAY_YEAR, i + 1);

        staff[i] = new Employee(
            getFullNameWithExplicitBirthday(birthday),
            getEmailOfIthEmployee(i),
            birthday.toDate()
        );
    }

    const result: Manager[] = MANAGER_NAMES.map(managerName => new Manager(getEmail(managerName), staff));

    await writeFile(MOCK_DATA_FILENAME!, JSON.stringify(convertModelsToApiFormat(result), null, 4));

    console.log("Mock data successfully generated!");
}

function getIthDayOfYear(year: number, i: number) {
    const date = moment();

    date.year(year);
    date.dayOfYear(i);

    return date;
}

function getFullNameWithExplicitBirthday(birthday: moment.Moment) {
    return `Фамилия_${birthday.date()} Имя_${birthday.month() + 1} Отчество_${birthday.year()}`;
}

function getEmailOfIthEmployee(i: number) {
    return getEmail(`employee_${i}`);
}

function getEmail(name: string) {
    return `${name}@${EMAIL_DOMAIN}`;
}

export { generateMockData };

generateMockData();