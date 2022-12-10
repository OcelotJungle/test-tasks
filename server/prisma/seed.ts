import { PrismaClient } from "@prisma/client";
import sha256 from "../src/utils/sha256";
import Chef from "../src/dto/auth/chef.dto";
import Dish from "../src/dto/menu/dish.dto";
import DishPhoto from "../src/dto/menu/dish-photo.dto";
import DishCategory from "../src/dto/menu/dish-category.dto";

const prisma = new PrismaClient();

const mock = {
    chefs: [
        new Chef("chef1", "pass1"),
        new Chef("chef2", "pass2")
    ],
    
    dishCategories: [
        new DishCategory("soup"),
        new DishCategory("appetizer"),
        new DishCategory("pasta"),
        new DishCategory("seafood"),
        new DishCategory("meat"),
        new DishCategory("dessert"),
        new DishCategory("beverage")
    ],

    dishes: [
        new Dish(
            "Soup of the Day", 
            "Our daily soup made with the freshest ingredients", 
            5.99, 
            0,
            [
                new DishPhoto("/dishes/soup-of-the-day.jpg"),
                new DishPhoto("/dishes/soup-of-the-day-2.jpg")
            ]
        ),
        new Dish(
            "Bruschetta", 
            "Grilled bread topped with tomatoes, garlic, and olive oil", 
            7.99, 
            1,
            [new DishPhoto("/dishes/bruschetta.jpg")]
        ),
        new Dish(
            "Caesar Salad", 
            "Crisp romaine lettuce with croutons, parmesan cheese, and Caesar dressing", 
            8.99, 
            1,
            [new DishPhoto("/dishes/caesar-salad.jpg")]
        ),
        new Dish(
            "Spaghetti Bolognese", 
            "Spaghetti pasta with a rich meat sauce", 
            12.99, 
            2,
            [new DishPhoto("/dishes/spaghetti-bolognese.jpg")]
        ),
        new Dish(
            "Grilled Salmon", 
            "Wild-caught salmon grilled to perfection", 
            15.99, 
            3,
            [new DishPhoto("/dishes/grilled-salmon.jpg")]
        ),
        new Dish(
            "Pork Tenderloin", 
            "Tender and juicy pork loin cooked to your liking", 
            18.99, 
            4,
            [new DishPhoto("/dishes/pork-tenderloin.jpg")]
        ),
        new Dish(
            "Cheesecake", 
            "Creamy cheesecake with a graham cracker crust", 
            6.99, 
            5,
            [new DishPhoto("/dishes/cheesecake.jpg")]
        ),
        new Dish(
            "Apple Pie", 
            "Warm apple pie with a flaky crust and a scoop of vanilla ice cream", 
            5.99, 
            5,
            [new DishPhoto("/dishes/apple-pie.jpg")]
        ),
        new Dish(
            "Chocolate Mousse", 
            "Rich and creamy chocolate mousse", 
            7.99, 
            5,
            [new DishPhoto("/dishes/chocolate-mousse.jpg")]
        ),
        new Dish(
            "Coca Cola", 
            "A classic Coca Cola", 
            2.99, 
            6,
            [new DishPhoto("/dishes/coca-cola.jpg")]
        ),
        new Dish(
            "Iced Tea", 
            "Refreshing iced tea made with real tea leaves",
            2.99,
            6,
            [new DishPhoto("/dishes/iced-tea.jpg")]
        ),
        new Dish(
            "Lemonade",
            "Homemade lemonade made with real lemons",
            2.99,
            6,
            [new DishPhoto("/dishes/lemonade.jpg")]
        )
    ]
};

async function seed() {
    for(const [id, { chefname, password }] of mock.chefs.entries()) {
        await prisma.chef.upsert({
            where: { id },
            create: {
                id,
                chefname,
                password_hash: sha256(password)
            },
            update: {}
        });
    }

    for(const [id, { name }] of mock.dishCategories.entries()) {
        await prisma.dishCategory.upsert({
            where: { id },
            create: {
                id,
                name
            },
            update: {}
        });
    }

    for(const [id, { name, description, price, categoryId, photos }] of mock.dishes.entries()) {
        await prisma.dish.upsert({
            where: { id },
            create: {
                id,
                name,
                description,
                price,
                category_id: categoryId,
                photos: { create: photos }
            },
            update: {}
        });
    }
}

async function exit(code = 0) {
    await prisma.$disconnect();
    process.exit(code);
}

process.once("SIGINT", exit);
process.once("SIGTERM", exit);

seed()
    .then(async () => await exit())
    .catch(async e => {
        console.error(e);
        await exit(1);
    });