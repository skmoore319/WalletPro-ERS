import * as React from 'react';
import { ListComponent } from './list-component';

export class RequestList extends React.Component<any, any> {
    public render() {
        return (
            <div className="container" id="main-menu">
                <h1>Hello, Scott</h1>
                <h2>You have submitted 3 requests</h2>
                <ListComponent />
            </div>
        )
    }
}