import * as React from 'react';
import { IRequestListState } from '../../reducers';
// import { Reimbursement } from '../../model/Reimbursement';

interface IProp extends IRequestListState {
    updateList: (phrase: string) => void
}

export class RequestListComponent extends React.Component<IProp, any> {
    constructor(props:any) {
        super(props);
    }

    public componentDidMount() {
        this.props.updateList('Fetching');
    }

    // public updateList = () => {
    //     this.props.updateList('Fetching');
    // }

    // public submit = (e: any) => {
    //     e.preventDefault();
    //     this.props.updateList('Fetching');
    // }

    public render() {
        // this.initialize();
        return (
            <div className="container" id="main-menu">
                <h1>Hello, Scott</h1>
                <h2>You have submitted 3 requests</h2>
                {/* <p>{this.props.requests.toString()}</p> */}
                {/* <div className="col-sm">
                    <button type="submit" className="btn btn-danger">Get Reimbursement Requests</button>
                </div>    */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Submitted by</th>
                                    <th scope="col">Date Of Submission</th>
                                    <th scope="col">Number Of Items</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Approver</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.requests.map(request => 
                                            
                                                <tr key={request.username}>
                                                <td>{request.username}</td>
                                                <td>{request.timeSubmitted}</td>
                                                <td>{request.items.length}</td>
                                                <td>{request.status}</td>
                                                <td>{request.approver}</td>
                                                </tr>,
                                                // <tr>
                                                //     <td>Time Submitted</td>
                                                //     <td>Title</td>
                                                //     <td>Amount</td>
                                                //     <td>Type</td>
                                                //     <td>Description</td>
                                                // </tr>,


                                                // 6/8/2018
                                                // Figure this out -- need to map yet another object, the item, within
                                                // each reimbursement request line item -- I want to click on a request
                                                // and see all the items on it
                                                // {
                                                //     request.items.map(item =>
                                                //         <tr key={item.timeSubmitted}>
                                                //             <td>{item.timeSubmitted}</td>
                                                //             <td>{item.title}</td>
                                                //             <td>{item.amount}</td>
                                                //             <td>{item.type}</td>
                                                //             <td>{item.description}</td>
                                                //         </tr>
                                                //     )
                                                // }
                                            )
                                    }
                                    {/* <tr data-toggle="collapse" data-target="#more-info-1" className="accordion-toggle" >
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className="hidden-row" >
                                            <div className="accordion-body-collapse" id="more-info-1" >Sample</div>
                                        </td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr>
                                    <tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr><tr>
                                        <td>thing</td>
                                        <td>thing</td>
                                        <td>thing</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}