import { json,  type RequestHandler } from "@sveltejs/kit";

let power = 70;

export const GET: RequestHandler = async () => {
    console.log(`GET ${power}`);
    return json({ power });
}

export const POST: RequestHandler = async event => {
    power = (await event.request.json()).power;
    console.log(`POST: ${power}`);
    return new Response();
}