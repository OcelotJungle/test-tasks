export default class Employee {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly birthday: Date
    ) {}
}