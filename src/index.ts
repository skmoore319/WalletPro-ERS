import express from 'express';
import {Request, Response, NextFunction} from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import {loginRouter} from './routers/login-router';
import {employeeMenuRouter} from './routers/employee-menu-router';
import {adminMenuRouter} from './routers/admin-menu-router';

const app = express();

const port = 3001;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
  };

// set up express to attach sessions
app.use(session(sess));

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'static'))
);

// Log response for testing purposes
app.use((req:Request, resp:Response, next:NextFunction) => {
    console.log(`request was made with url: ${req.path}
    and method: ${req.method}`);
    next();
})

// Register bodyParser
app.use(bodyParser.json());

// allow cross origins
app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

/**********************************************************************
 * Register Routers
 *********************************************************************/
// Need route to employee main menu. Authentication should happen above, and
// choose where to go based on user status
app.use('/validate', loginRouter);

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