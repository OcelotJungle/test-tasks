export default function getAuthorizedHeaders(jwt = localStorage.getItem("jwt")) {
    return { headers: { Authorization: `Bearer ${jwt}` } };
}