import { Manager } from "../models";

interface Api {
    fetch(): Promise<Manager[]>
}

export default Api;