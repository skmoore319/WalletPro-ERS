import { updateUsername } from './../../redux-demo/redux-demo/src/actions/sign-in/sign-in.actions';
import express, { json } from 'express';
import * as ersService from '../services/ers-service';

export const loginRouter = express.Router();

/**
 * This route expects an object with a usename and password. If the username and password is recognized it will set a role attribute on
 * the current session so that the role can be viewed upon future requests.
 */
loginRouter.post('/login', (req, resp, next) => {

    console.log('Reached login post')
  const user = req.body && req.body;
  console.log(user);

  // should probably send a call to the db to get the actual user object to determine role
  // Query the database to see if a username exists in the database
  // Need functions in DAO that:
    // Queries the user table and gets a response if the input username matches one in the DB
        
    ersService.userExists(req.body.username)
        .then(data => {
            console.log(data)
            let targetUser = data.Items[0];
            console.log(targetUser);
            // resp.json(data.Items[0]);
            if (targetUser.password === req.body.password) {
                console.log(`Reached successful login`)
                console.log(targetUser.username)
                req.session.role = targetUser.role;
                req.session.username = targetUser.username;
                console.log(req.session.role)
                resp.json({
                    username: 'skmoore',
                    role: 'employee'
                });
            } else {
                console.log(`Reached invalid login`)
                resp.sendStatus(401);
            }
        }).catch(err => {
            console.log(err);
            resp.sendStatus(404);
        })

    // if (req.body.username === 'admin' && req.body.password === 'admin') {
    //     req.session.role = 'admin';
    //     resp.json({
    //     username: 'admin',
    //     role: 'admin'
    //     });
    // } else if (req.body.username === 'blake' && req.body.password === 'pass') {
    //     req.session.role = 'employee';
    //     resp.json({
    //     username: 'blake',
    //     role: 'employee'
    //     });
    // } else {
    //     resp.sendStatus(401);
    // }
});

/**
 * This will reset the session so that all session data is removed and a new session id will be created
 */
loginRouter.delete('/logout', (req, resp, next) => {
  req.session.regenerate(err => {
    if (err) {
      resp.sendStatus(500);
    } else {
      resp.end();
    }
  });
});
