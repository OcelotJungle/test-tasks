import moment from "moment";
import { Rukovoditel, Sotrudnik } from "../types";
import { Employee, Manager } from "../models";

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
        moment(birthday, "DD.MM.YYYY").toDate()
    );
}

export { convertApiFormatToModels };