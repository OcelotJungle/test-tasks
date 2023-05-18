import { Employee } from ".";

export default class Manager {
    constructor(
        public readonly email: string,
        public readonly staff: Employee[]
    ) {}
}