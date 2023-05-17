import Manager from "../models/Manager";

interface Api {
    fetch(): Promise<Manager[]>
}

export default Api;