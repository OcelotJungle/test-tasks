import { Prisma } from "@prisma/client";

export default function isPrismaNotFoundError(e: unknown) {
    return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";
}