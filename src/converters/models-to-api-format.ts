import moment from "moment";
import Manager from "../models/Manager";
import Rukovoditel from "../types/Rukovoditel";
import Sotrudniki from "../types/Sotrudniki";

function convertModelsToApiFormat(mockData: Manager[]) {
    const result: Rukovoditel[] = [];
    
    for(const manager of mockData) {
        result.push({
            rukovoditel: manager.email,
            sotrudniki: manager.staff.reduce((result, employee, i) => {
                result[`sotrudnik${i + 1}`] = {
                    name: employee.name,
                    email: employee.email,
                    birthday: convertDateToRuDateFormat(employee.birthday)
                };

                return result;
            }, {} as Sotrudniki)
        });
    }

    return result;
}

function convertDateToRuDateFormat(date: Date) {
    return moment(date).format("DD.MM.YYYY");
}

export { convertModelsToApiFormat };