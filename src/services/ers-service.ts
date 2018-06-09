// A service that can handle the routers' commands and submit queries to the DAO
import * as ersDao from '../dao/ers-dao';

// User management
export function userExists(username: string) {
    return ersDao.userExists(username);
}

// If the user is an employee, this function will show all reimbursement requests
// under the employee's username
// If the user is an admin, this function will show all reimbursement requests submitted
// under a username that the admin previously specified.
export function viewMyRequests(username: string) {
    return ersDao.viewMyRequests(username);
}

// Construct a new reimbursement request from the user's inputs, and then pass along
// this new object to the DAO to save the request.
export function submitRequest(reimbursement) {
    return ersDao.submitRequest(reimbursement);
}

// Display all requests in the list of the specified status. In the app, a link to
// view all pending requests will pass the string "Pending" as an input into this function
export function viewRequestsByStatus(status: string) {
    return ersDao.viewRequestsByStatus(status);
}

// For admins. Change the status of selected requests to either "Approved" or "Denied"
export function applyAction(status:string, username:string, reimbursement) {
    return ersDao.applyAction(status, username, reimbursement);
}