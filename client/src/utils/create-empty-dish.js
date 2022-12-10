export default function createEmptyDish() {
    return {
        id: -1,
        name: "",
        description: "",
        price: 0,
        category: { id: -1 },
        photos: []
    }
}