export class Item {
    public title:string = '';
    public timeOfExpense:Date = new Date();
    public amount:number = 0;
    public type:string = '';
    public description:string = '';

    constructor(title:string, amount:number, type:string, description:string, timeOfExpense:Date) {
        this.title = title;
        this.timeOfExpense = timeOfExpense;
        this.amount = amount;
        this.type = type;
        this.description = description;
    }
}