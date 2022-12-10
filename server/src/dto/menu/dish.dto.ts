import DishPhotoDto from "./dish-photo.dto";

export default class DishDto {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly price: number,
        readonly categoryId: number,
        readonly photos: DishPhotoDto[]
    ) {}
}