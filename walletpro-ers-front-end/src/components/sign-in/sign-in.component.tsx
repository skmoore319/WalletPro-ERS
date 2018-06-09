import * as React from 'react';
// import { environment } from '../../environment';

export class SignInComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public updateUsername = (e: any) => {
      const username = e.target.value;
      this.props.updateUsername(username);
  }

  public updatePassword = (e: any) => {
      const password = e.target.value;
      this.props.updatePassword(password);
  }

  public submit = (e: any) => {
      e.preventDefault();
      const {username, password} = this.props; // Destructuring
    //   console.log(`${username} ${password}`)
    //   console.log(JSON.stringify({username, password}));
    //   fetch('http://localhost:3001/validate/login', {
    //     body: JSON.stringify({username, password}),
    //     credentials: 'include',
    //     headers: {
    //     'content-type': 'application/json'
    //     },
    //     method: 'POST'
    //     })
    //     .then(resp => {
    //         console.log(resp.body);
    //         console.log(resp.status)
    //         if (resp.status >= 400 || resp.status < 500) {
    //             if (resp.status === 401) {
    //                 this.props.updateError('Invalid credentials, try again.');
    //                 return resp.status;
    //             } else if (resp.status === 404) {
    //                 this.props.updateError(`Sorry. You don't exist`);
    //                 return resp.status;
    //             } else {
    //                 this.props.updateError(`Bad request`);
    //                 return resp.status;
    //             }
    //         }
    //         if (resp.status === 200) {
    //             this.props.updateError(``);
    //             console.log(resp.json);
    //             return resp.json();
    //         } else {
    //             return resp.status;
    //         }
    //     })
    //     .then(data => {
    //         console.log(data);
    //         // this.props.history.push('');
    //     })
    //     .catch(err => {
    //         this.props.updateError('Unable to log in at this time. Please try again.');
    //     })

        fetch('http://localhost:3001/validate/login', {
            body: JSON.stringify({username, password}),
            credentials: 'include',
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST'
            })
            .then(resp => {
                console.log(resp.status)
                if (resp.status === 401) {
                    this.props.updateError('Invalid credentials, try again.');
                } else if (resp.status === 404) {
                    this.props.updateError(`sry. u dont exists haha`);
                }
                if (resp.status === 200) {
                    return resp.json();
                }
                return;
            })
            .then(data => {
                console.log(data);
                if (data) {this.props.history.push('')};
            })
            .catch(err => {
                this.props.updateError('Unable to log in at this time. Please try again.');
            })
  }

  public render() {
    return (
      <form className="form-signin" onSubmit={this.submit} >
        <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input value={this.props.username}
            onChange={this.updateUsername}
            type="text" id="inputUsername"
            className="form-control"
            placeholder="Username"
            required />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input value={this.props.password}
            onChange={this.updatePassword}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required />
        { this.props.errorMessage !== '' &&
            <div id="error-message">
                {this.props.errorMessage}
            </div>
        }
        <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me" /> Remember me
            </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    );
  }
}