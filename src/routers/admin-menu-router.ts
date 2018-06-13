import express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as ersService from '../services/ers-service';

export const adminMenuRouter = express.Router();

//JSON structure to test HTTP requests and admin capabilities
let reimbursementItem1 =
{
    title: "food1",
    amount: 20.47,
    description: "FOOD",
    timeOfExpense: Date.now()
};

let reimbursementItem2 =
{
    title: "lodging1",
    amount: 75,
    description: "LODGING",
    timeOfExpense: Date.now()
};

let reimbursement1 = 
{
    username: "skmoore",
    timeSubmitted: Date.now(),
    items: [reimbursementItem1, reimbursementItem2],
    approver: "",
    status: "Pending",
    receipts: []
};

let reimbursementItem3 = {
    title: "food2",
    amount: 15,
    description: "FOOD",
    timeOfExpense: Date.now()
};

let reimbursementItem4 = {
    title: "travel1",
    amount: 300,
    description: "TRAVEL",
    timeOfExpense: Date.now()
};

let reimbursement2 = 
{
    username: "skmoore",
    timeSubmitted: Date.now(),
    items: [reimbursementItem3, reimbursementItem4],
    approver: "",
    status: "Pending",
    receipts: []
};

let scottReimbursement =
[
    reimbursement1,
    reimbursement2
];

let reimbursementItem5 = {
    title: "travel2",
    amount: 150,
    description: "TRAVEL",
    timeOfExpense: Date.now()
};

let reimbursement3 = 
{
    username: "jscript",
    timeSubmitted: Date.now(),
    items: [reimbursementItem5],
    approver: "",
    status: "Pending",
    receipts: []
};

let jasonReimbursement = 
[
    reimbursement3
];

let allReimbursements = [
    scottReimbursement,
    jasonReimbursement
];

let scott = {
    username: "skmoore",
    password: "pass1",
    firstName: "Scott",
    lastName: "Moore",
    email: "scott@example.com",
    role: "Employee"
};

let jason = {
    username: "jscript",
    password: "pass2",
    firstName: "Jason",
    lastName: "Script",
    email: "jack@example.com",
    role: "Employee"
};

let boss = {
    username: "bossman",
    password: "pass3",
    firstName: "Mr",
    lastName: "Boss",
    email: "bossman@example.com",
    role: "Admin"
};

let payroll = [
    scott,
    jason,
    boss
];

// Show an employee's request history
adminMenuRouter.get('/:username/users/:employeeUsername', (req:Request, resp:Response) => {
    // Use a service to display all reimbursement requests submitted by a certain employee
    ersService.viewMyRequests(req.params.employeeUsername)
        .then(data => {
            resp.json(data.Items);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        })

    // let targetUser = payroll[payroll.findIndex((x) => x.username === req.params.username)];
    // let targetUsername = targetUser.username;
    // let targetFirst = targetUser.firstName;
    // let targetLast = targetUser.lastName;
    // let reimburseHistory = allReimbursements[allReimbursements.findIndex((x) => x[0].username === targetUsername)];
    // console.log(`Retrieving request history for ${targetFirst} ${targetLast}`);
    // resp.json(reimburseHistory);
    // resp.end();
});

// To get all pending requests
let allPending = [];
adminMenuRouter.get('/requests/pending', (req:Request, resp:Response) => {
    // Use a service to display all pending reimbursement requests
    ersService.viewRequestsByStatus('Pending')
        .then(data => {
            // console.log(data.Items)
            resp.json(data.Items);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        })
    
    // for(let e of allReimbursements) {
    //     for(let f of e) {
    //         if (f.status === "Pending") allPending.push(f);
    //     }
    // }
    // resp.json(allPending);
    // resp.end();
});

// To approve or deny selected requests
adminMenuRouter.put('/requests/approve-deny', (req:Request, resp:Response) => {
    
    // Use a service to update selected requests to have new statuses, either approved or denied,
    // and include the name of the approver.
    let selection = req.body;
    let adminName = req.session.username;
    let promises = [];
    for (let e of selection) {
        console.log(`Now showing item: ${e}`)
        ersService.applyAction(e.status, adminName, e)
            .then(data => {
                // Need to determine which response was processed
                // Add to an array of booleans.
                promises.push(true);
                // If any error ever occurs in updating the current reimbursement request,
                // the function shouldn't continue endlessly -- instead, the catch block
                // should take over
                // Otherwise, check the number of successes against the number of reimbursements,
                // and send a response when the numbers match.
                if(promises.length === selection.length) {
                    console.log('Equal')
                    resp.end();
                }
            })
            .catch(err => {
                promises.push(false);
                console.log(err);
                resp.sendStatus(500);
            })
    }
    // if (promises) {
    //     resp.sendStatus(200);
    // } else {
    //     resp.sendStatus(500);
    // }

    // Make an endpoint to send an array of reimbursement requests at once
    // Promise.all(promises)
    //     .then(data => {
    //         resp.json(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         resp.sendStatus(500);
    //     })

    // console.log(allPending);
    // These variable definitions both need to be rewritten. Right now, all pending
    // requests will just be denied if it runs as is. The admin needs to be able
    // to select certain requests and specify an action to approve or deny whatever is
    // selected.
    // let approveSelected = allPending;
    // let denySelected = allPending;

    // for (let e of approveSelected) {
        // This should be the statement that works.
    //     let indices = [];
    //     for (let f of allReimbursements) {
    //         indices.push(f.indexOf(e));
    //     }
    //     console.log(indices);
    //     let targetIndex = indices.findIndex((x) => x > -1);
    //     let targetObject = allReimbursements[targetIndex];
    //     console.log(targetIndex);
    //     allReimbursements[targetIndex][targetObject.indexOf(e)].status = "Approved";
    //     allReimbursements[targetIndex][targetObject.indexOf(e)].approver = req.params.username;
    //     console.log("success!");
    // }

    // for (let e of denySelected) {
        
    //     let indices = [];
    //     for (let f of allReimbursements) {
    //         indices.push(f.indexOf(e));
    //     }
    //     console.log(indices);
    //     let targetIndex = indices.findIndex((x) => x > -1);
    //     let targetObject = allReimbursements[targetIndex];
    //     console.log(targetIndex);
    //     allReimbursements[targetIndex][targetObject.indexOf(e)].status = "Denied";
    //     allReimbursements[targetIndex][targetObject.indexOf(e)].approver = req.params.username;
    //     console.log("success!");
    // }

    // resp.end();
});

// Show the main menu for a logged in admin
adminMenuRouter.get('/:username', (req:Request, resp:Response) => {
    console.log('Admin main menu reached!');
    resp.end();
});