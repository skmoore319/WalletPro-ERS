// Needed functions:
// - Get and display all requests that are made by a logged in employee.
// - Post a new reimbursement request to the table of reimbursement requests.
// - Select an employee and show that employee's request history (ADMIN)
// - View all pending reimbursement requests (ADMIN)
// - Approve or deny selected requests (ADMIN)

import aws, { DynamoDB } from 'aws-sdk';

import {ConfigurationOptions} from 'aws-sdk/lib/config';
const awsConfig: ConfigurationOptions = {
    region: 'us-east-1',
    accessKeyId: process.env.REVATURE_PROJECT1_ERS_ACCESS_KEY,
    secretAccessKey: process.env.REVATURE_PROJECT1_ERS_SECRET_ACCESS_KEY
};

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

// Shouldn't need functionality for creating tables, as everything I need for this project
// was already created in DynamoDB. But here's an inactive function for it anyway, just in
// case.

// export function createMovieTable() {
//     dynamodb.createTable({
//       TableName: 'movies',
//       KeySchema: [
//         {AttributeName: 'year', KeyType: 'HASH'},
//         {AttributeName: 'title', KeyType: 'RANGE'}
//       ],
//       AttributeDefinitions: [
//         {AttributeName: 'year', AttributeType: 'N'},
//         {AttributeName: 'title', AttributeType: 'S'}
//       ],
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 2
//       }
//     }, (err, data) => {
//       if(err) {
//         console.log(`Unable to creat table: \n ${JSON.stringify(err, undefined, 2)}`);
//       } else {
//         console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`);
//       }
//     });
//   }

// - Get and display all requests that are made by a logged in employee.
export function viewMyRequests(username: string): Promise<any> {
    // console.log(username);
    return docClient.query({
        TableName: 'reimbursement',
        KeyConditionExpression: '#usr = :usename',
        ExpressionAttributeNames: {
            '#usr': 'username'
        },
        ExpressionAttributeValues: {
            ':usename': username
        }
    }).promise();
}

// - Post a new reimbursement request to the table of reimbursement requests.
export function submitRequest(reimbursement): Promise<any> {
    // VERY IMPORTANT! The parameter 'reimbursement' must be defined in the
    // service that calls this method. The service should construct a reimbursement
    // from the inputs supplied by a logged in employee.
    return docClient.put({
        TableName: 'reimbursement',
        Item: reimbursement
    }).promise();
}
// - Select an employee and show that employee's request history (ADMIN)
export function viewEmployeeHistory(username: string): Promise<any> {
    // This function may be redundant. A service could have logic inside of it that
    // calls the viewMyRequests() function with different inputs, depending on
    // whether the client is an employee or an administrator
    return;
}

// - View all pending reimbursement requests (ADMIN)
export function viewRequestsByStatus(status: string): Promise<any> {
    return docClient.query({
        TableName: 'reimbursement',
        IndexName: 'status-index',
        KeyConditionExpression: '#stat = :targetStat',
        ExpressionAttributeNames: {
            '#stat': 'status'
        },
        ExpressionAttributeValues: {
            ':targetStat' : status
        }
    }).promise();
}

// - Approve or deny selected requests (ADMIN)
export function applyAction(status: string, username: string, reimbursement): Promise<any> {
    return docClient.update({
        TableName: 'reimbursement',
        Key: {
            username: reimbursement.username,
            timeSubmitted: reimbursement.timeSubmitted
        },
        UpdateExpression: 'set #stat = :targetStat, #appr = :adName',
        ExpressionAttributeNames: {
            '#stat': 'status',
            '#appr': 'approver'
        },
        ExpressionAttributeValues: {
            ':targetStat': status,
            ':adName': username
        }
    }).promise();
}