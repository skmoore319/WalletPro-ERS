import { updateUsername } from './../../redux-demo/redux-demo/src/actions/sign-in/sign-in.actions';
import express, { json } from 'express';
import session from 'express-session';
import * as ersService from '../services/ers-service';

export const loginRouter = express.Router();

/**
 * This route expects an object with a usename and password. If the username and password is recognized it will set a role attribute on
 * the current session so that the role can be viewed upon future requests.
 */
loginRouter.post('/login', (req, resp, next) => {

  const user = req.body && req.body;

  // should probably send a call to the db to get the actual user object to determine role
  // Query the database to see if a username exists in the database
  // Need functions in DAO that:
    // Queries the user table and gets a response if the input username matches one in the DB
        
    ersService.userExists(req.body.username)
        .then(data => {
            let targetUser = data.Items[0];
            if (targetUser.password === req.body.password) {
                req.session.role = targetUser.role;
                req.session.username = targetUser.username;
                resp.json({
                    username: 'skmoore',
                    role: 'employee'
                });
            } else {
                resp.sendStatus(401);
            }
        }).catch(err => {
            console.log(err);
            resp.sendStatus(404);
        })
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
