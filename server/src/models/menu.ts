import { Prisma } from "@prisma/client";
import DishPhotoDto from "../dto/menu/dish-photo.dto";
import DishDto from "../dto/menu/dish.dto";
import { prisma } from "../lib/db";
import isPrismaNotFoundError from "../utils/is-prisma-not-found-error";

const excludeCategoryId = {
    id: true,
    name: true,
    description: true,
    price: true
};
const includeCategoryData = { category: true };
const includeOnlyPhotoUrls = { photos: { select: { url: true } } };
const defaultSelect = {
    ...excludeCategoryId,
    ...includeCategoryData,
    ...includeOnlyPhotoUrls
};

export default class MenuModel {
    static async getCategories() {
        return await prisma.dishCategory.findMany({ orderBy: { dish: { _count: "desc" } } });
    }

    static async getAll() {
        return await prisma.dish.findMany({
            select: defaultSelect,
            orderBy: { id: "asc" }
        });
    }

    static async get(id: number) {
        return await prisma.dish.findUnique({
            where: { id },
            select: defaultSelect
        });
    }

    static async create(dish: DishDto, photos: DishPhotoDto[]) {
        const { name, description, price, categoryId } = dish;
        
        return await prisma.dish.create({
            data: {
                name,
                description,
                price: new Prisma.Decimal(price),
                category: { connect: { id: categoryId } },
                photos: { create: photos }
            },
            select: defaultSelect
        });
    }

    static async update(id: number, dish: DishDto, photos: DishPhotoDto[]) {
        const { name, description, price } = dish;

        try {
            return await prisma.dish.update({
                where: { id },
                data: {
                    name,
                    description,
                    price: new Prisma.Decimal(price),
                    category: {
                        connect: {
                            id: dish.categoryId
                        }
                    },
                    photos: {
                        createMany: {
                            data: photos,
    
                            // Should be de-duplicated manually in real project as creates "phantom" indices
                            skipDuplicates: true
                        },
                        deleteMany: { url: { not: { in: photos.map(p => p.url) } } },
                    }
                },
                select: defaultSelect
            });
        } catch(e) {
            if(isPrismaNotFoundError(e)) return null;
            throw e;
        }

    }

    static async remove(id: number) {
        try {
            await prisma.dish.delete({ where: { id } });
            return true;
        } catch(e) {
            if(isPrismaNotFoundError(e)) return false;
            throw e;
        }
    }
}