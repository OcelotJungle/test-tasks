import moment from "moment";
import Employee from "../models/Employee";
import Manager from "../models/Manager";
import Rukovoditel from "../types/Rukovoditel";
import Sotrudnik from "../types/Sotrudnik";

function convertApiFormatToModels(data: Rukovoditel[]) {
    return data.map(convertRukovoditelToManager);
}

function convertRukovoditelToManager({ rukovoditel, sotrudniki }: Rukovoditel) {
    return new Manager(
        rukovoditel,
        Object.values(sotrudniki).map(convertSotrudnikToEmployee)
    );
}

function convertSotrudnikToEmployee({ name, email, birthday }: Sotrudnik) {
    return new Employee(
        name,
        email,
        moment(birthday).toDate()
    );
}

export { convertApiFormatToModels };