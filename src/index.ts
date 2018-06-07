import express from 'express';
import {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import {employeeMenuRouter} from './routers/employee-menu-router';
import {adminMenuRouter} from './routers/admin-menu-router';

const app = express();

const port = 3001;
app.set('port', port);

// Log response for testing purposes
app.use((req:Request, resp:Response, next:NextFunction) => {
    console.log(`request was made with url: ${req.path}
    and method: ${req.method}`);
    next();
})

// Register bodyParser
app.use(bodyParser.json());

/**********************************************************************
 * Register Routers
 *********************************************************************/
// Need route to employee main menu. Authentication should happen above, and
// choose where to go based on user status
app.use('/employees', employeeMenuRouter);

app.use('/admins', adminMenuRouter);

app.use((req:Request, resp:Response, next:NextFunction) => {
    console.log(`request was made with url: ${req.path}
    and method: ${req.method}`)
})
// Hi
app.listen(port, () => {
    console.log(`ERS is running at http://localhost: ${app.get('port')}`);
});