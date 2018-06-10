export class Item {
    public title:string = '';
    public dateOfExpense:Date = new Date();
    public amount:number = 0;
    public type:string = '';
    public description:string = '';

    constructor(title:string, amount:number, type:string, description:string, dateOfExpense:Date) {
        this.title = title;
        this.dateOfExpense = dateOfExpense;
        this.amount = amount;
        this.type = type;
        this.description = description;
    }
}