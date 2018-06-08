export class Reimbursement {
    public username:string = '';
    public timeSubmitted:Date = new Date();
    public items:any = [];
    public status:string = '';
    public approver:string = ''
    public receipts:any = [];

    constructor(username: string, items: any) {
        this.username = username;
        this.timeSubmitted = new Date();
        this.items = items;
        this.status = 'Pending';
        this.approver = '';
        this.receipts = [];
    }
}