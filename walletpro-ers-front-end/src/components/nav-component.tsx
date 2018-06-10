import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavComponent: React.StatelessComponent<{}> = () => {
    return(
        <div>
            <nav className="navbar fixed-top navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
                <div className="navbar-header c-pointer shift-left">
                    WalletPro
                    {/* <Link to="/home" className="unset-anchor">
                        <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
                    </Link> */}
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                <ul className="navbar-nav ml-auto margin-nav">
                    <li className="nav-item active">
                    <Link to="/users/skmoore" className="unset-anchor nav-link">Home</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/log-in" className="unset-anchor nav-link">Log In</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/log-out" className="unset-anchor nav-link">Log Out</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/employee-search" className="unset-anchor nav-link">Search Employee</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/view-pending" className="unset-anchor nav-link">View All Pending</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/users/skmoore/add-request" className="unset-anchor nav-link">Submit New Request</Link>
                    </li>
                    <li className="nav-item active dropdown">
                    <a className="nav-link dropdown-toggle pointer" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selection</a>
                    <div className="dropdown-menu" id="selection-dropdown-menu" aria-labelledby="dropdown04">
                        <div className="dropdown-item"><Link to="/home" className="unset-anchor nav-link active">Approve</Link></div>
                        <div className="dropdown-item"><Link to="/home" className="unset-anchor nav-link active">Deny</Link></div>
                    </div>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    )
}