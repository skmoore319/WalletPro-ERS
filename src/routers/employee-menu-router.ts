import express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as ersService from '../services/ers-service';

export const employeeMenuRouter = express.Router();

// For testing HTTP requests and file writing
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

let reimbursement = 
{
    username: "skmoore",
    timeSubmitted: Date.now(),
    items: [reimbursementItem1, reimbursementItem2],
    approver: "admin",
    status: "Pending",
    receipts: []
};

let myReimbursements =
[
    reimbursement
];

// To index page containing all reimbursement requests for the employee
employeeMenuRouter.get('/:username/requests', (req:Request, resp:Response) => {
    console.log("Retrieving all reimbursement requests...");
    // Use a service to get and display all the requests made by the logged in employee
    // console.log(req.params.username);
    ersService.viewMyRequests(req.params.username)
        .then(data => {
            resp.json(data.Items);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        });
    // resp.json(myReimbursements);
    // resp.end();
});

// Show the main menu for a logged in employee
employeeMenuRouter.get('/:username', (req:Request, resp:Response) => {
    console.log('Employee main menu reached!');
    resp.end();
});

// To main menu url, but post a new entry in the user's JSON object
employeeMenuRouter.post('/:username', (req:Request, resp:Response) => {
    // Use a service to post a new reimbursement request to the table of reimbursement
    // requests

    let nextReimbursement = req.body;
    let targetUser = req.params.username;

    console.log(req.body);

    ersService.submitRequest(nextReimbursement)
        .then(data => {
            resp.json(data);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        })

    // if(!(req.body.username && req.body.items)) {
    //     resp.sendStatus(400);
    // } else {
    //     let itemsToAdd = [];
    //     for (let i of req.body.items) {
    //         itemsToAdd.push(i);
    //     }
    //     let newReimbursement =
    //     {
    //         username: req.body.username,
    //         timeSubmitted: Date.now(),
    //         items: itemsToAdd,
    //         approver: "admin",
    //         status: "Pending",
    //         receipts: []
    //     };
    //     myReimbursements.push(newReimbursement);
    //     resp.sendStatus(201);
    //     resp.end();
    // }
});