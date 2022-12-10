import axios from "axios";
import getAuthorizedHeaders from "./get-authorized-headers";

export default async function authorize() {
    const jwt = localStorage.getItem("jwt");
    if(!jwt) return false;

    try {
        const { status } = await axios.get("/api/auth/authorize", getAuthorizedHeaders(jwt));
        return status === 200;
    } catch(e) {
        localStorage.removeItem("jwt");
        return false;
    }
}