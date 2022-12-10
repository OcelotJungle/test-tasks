import ChefDto from "../dto/auth/chef.dto";
import { prisma } from "../lib/db";
import jwt from "jsonwebtoken";
import sha256 from "../utils/sha256";

export default class AuthModel {
    static async authenticate({ chefname, password }: ChefDto) {
        const chef = await prisma.chef.findFirst({
            where: {
                chefname,
                password_hash: sha256(password)
            }
        });
        
        return chef ? jwt.sign({ chefId: chef.id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" }) : null;
    }
}