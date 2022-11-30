import { Request, Response } from "express";
import { Client } from "pg";

import { RequestInfo, RequestInit } from 'node-fetch';
const fetch = (url: RequestInfo, init?: RequestInit) =>
    import('node-fetch').then(({ default: fetch }) => fetch(url, init));

export default class API {
    private client = new Client();

    async openConnection() {
        await this.client.connect();
    }

    async closeConnection() {
        await this.client.end();
    }

    async query(text: string) {
        try {
            return await this.client.query(text);
        } catch(e) {
            console.error("Something went wrong during querying the DB:");
            console.error(e);
        }
    }

    async getAllRooms(res: Response) {
        console.debug("- Get all rooms");

        const result = await this.query("SELECT id, number FROM room");
    
        if(result) {
            res.status(200);
            res.json(result.rows);
        } else APITools.dbError(res);
    }

    async getFreeRooms(req: Request, res: Response) {
        console.debug(`- Get free rooms for ['${req.query.from}', '${req.query.to}']`);

        try {
            const { from, to } = APITools.getDates(req.query);
    
            const result = await this.query(APITools.getFreeRoomsForPeriodQuery(from, to));
    
            if(result) {
                res.status(200);
                res.json(result.rows);
            } else APITools.dbError(res);
        } catch(e) {
            res.status(400);
            res.end("Wrong dates");
        }
    }

    async bookRoom(req: Request, res: Response) {
        console.debug(`- Book room '${req.params.roomId}' by '${req.query.guestId}' (vip=${req.query.vip}) for ['${req.query.from}', '${req.query.to}']`);

        try {
            const { from, to } = APITools.getDates(req.query);
    
            try {
                const roomId = Number.parseInt(String(req.params.roomId));
                if(!roomId || Number.isNaN(roomId)) throw new Error("Wrong room id");
    
                const guestId = Number.parseInt(String(req.query.guestId));
                if(!guestId || Number.isNaN(guestId)) throw new Error("Wrong guest id");

                const guestWithThisId = await this.query(`SELECT * FROM guest WHERE id=${guestId}`);

                if(!guestWithThisId) return APITools.dbError(res);

                // Checking if guest exists
                if(guestWithThisId.rows.length === 0) {
                    res.status(404);
                    res.end("Unknown guest");
                    return;
                }
    
                let vip = false;
                if(req.query.vip === "1") vip = true; // Forcing vip status
                else {
                    // Allegedly request for vip status
                    await fetch("https://jsonplaceholder.typicode.com/albums/1");
                    
                    // Real vip status determination (20% chance)
                    vip = Math.random() < 0.2;
                }
    
                const freeRooms = await this.query(APITools.getFreeRoomsForPeriodQuery(from, to));
    
                if(!freeRooms) return APITools.dbError(res);
    
                // Checking if room is still free
                if(!freeRooms?.rows.some(({ id }) => id === roomId)) {
                    res.status(409);
                    res.end("Already booked");
                    return;
                }
    
                const result = await this.query(`
                    INSERT INTO booking(room_id, guest_id, from_date, to_date, vip)
                        VALUES (${roomId}, ${guestId}, '${from}', '${to}', ${vip})
                `);
    
                if(result?.rowCount === 1) {
                    res.status(201);
                    res.end();
                } else APITools.dbError(res);
            } catch(e: any) {
                res.status(400);
                res.end(e.message);
            }
        } catch(e) {
            res.status(400);
            res.end("Wrong dates");
        }
    }

    async deleteBookingById(req: Request, res: Response) {
        console.debug(`- Delete booking '${req.params.bookingId}'`);

        const bookingId = Number.parseInt(req.params.bookingId);
        if(!bookingId || Number.isNaN(bookingId)) {
            res.status(406);
            res.end("Wrong booking id");
            return;
        }
    
        const result = await this.query(`DELETE FROM booking WHERE id=${bookingId}`);
    
        if(!result) return APITools.dbError(res);
    
        if(result.rowCount === 0) {
            res.status(404);
            res.end("Booking not found");
            return;
        }
    
        res.status(200);
        res.end();
    }
}

class APITools {
    // Just for not writing the same 10 times
    static dbError(res: Response) {
        res.status(500);
        res.end();
    }

    // Could use middleware, but over-engineering
    static getDates(query: any) {
        const from = new Date(String(query.from));
        if(from < new Date()) throw new Error();

        const to = new Date(String(query.to));
        if(to < from) throw new Error();

        return {
            from: from.toISOString().slice(0, 10),
            to: to.toISOString().slice(0, 10)
        };
    }

    static getFreeRoomsForPeriodQuery(from: string, to: string) {
        return `
            SELECT room.* FROM booking
                JOIN room ON booking.room_id=room.id
                    AND ('${from}' > to_date OR '${to}' < from_date)
            UNION
            SELECT room.* FROM room
                LEFT JOIN booking ON booking.room_id=room.id
            WHERE booking.room_id IS NULL
        `;
    }
}