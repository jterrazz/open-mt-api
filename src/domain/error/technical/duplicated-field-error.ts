export class DuplicatedFieldError {
    field: string;

    constructor(field: string) {
        this.field = field;
    }
}
