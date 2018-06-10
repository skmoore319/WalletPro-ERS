import * as React from 'react';
import { IRequestListState } from '../../reducers';
import { Reimbursement } from '../../model/Reimbursement';
import { Item } from '../../model/Item';
// import { RequestItemComponent } from '../request-item.component';

interface IProp extends IRequestListState {
  updateYear: (year: number) => void
  updateMovies: (year: number) => void
  updateDescription: (description: string) => void
  updateTitle: (title: string) => void
  updateRating: (rating: number) => void
  updateList: (request: Reimbursement) => void
  updateRequest: (item: Item) => void
  updateDate: (dateOfExpense: Date) => void
}

export class RequestAddComponent extends React.Component<IProp, any> {

  constructor(props: any) {
    super(props);
  }

  public updateDescription = (e:any) => {
      const description = e.target.value;
      this.props.updateDescription(description);
  }

  public updateTitle = (e:any) => {
    const title = e.target.value;
    this.props.updateTitle(title);
    }

    public updateDate = (e:any) => {
        const date = e.target.value;
        this.props.updateDate(date);
        }

    public updateRating = (e:any) => {
        const rating = e.target.value;
        this.props.updateRating(rating);
    }

    public updateYear = (e:any) => {
        const year = e.target.value;
        this.props.updateYear(year);
    }

    public updateReimbursement = (e:any) => {
        const newItemString = e.target.value;
        const nextItem = JSON.parse(newItemString);
        this.props.updateRequest(nextItem);
        alert('Added item!')
    }

    public submit = (e: any) => {
    e.preventDefault();
    // const inputYear = this.props.year;
    // const inputTitle = this.props.movieForm.title;
    // const inputRating:number = this.props.movieForm.rating;
    // console.log(inputRating);
    // console.log(typeof(inputRating));
    // console.log(Number.parseInt(inputRating))
    // const inputDescription = this.props.movieForm.description;
    // console.log(inputDescription);
    // const request: Reimbursement = new Reimbursement('skmoore', [])
    console.log('success');
    // this.props.updateList(request);
    }

  public render() {
      let title: string = '';
      let dateOfExpense = new Date();
      let amount = 0;
      let type = 'OTHER';
      let description = '';
    return (
        <div className="container" id="request-add-menu">
            <form className="container" onSubmit={this.submit}>
                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="input-title">Title</label>
                        <input type="type"
                            value={this.props.item.title}
                            onChange={this.updateTitle.bind(this)}
                            {...title = this.props.item.title}
                            className="form-control"
                            id="input-year"
                            placeholder="Title"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-date-of-expense">Date Of Expense</label>
                        <input type="date"
                            {...console.log(this.props.item.dateOfExpense)}
                            value={this.props.item.dateOfExpense.toDateString()}
                            {...dateOfExpense = this.props.item.dateOfExpense}
                            onChange={this.updateDate.bind(this)}
                            className="form-control"
                            id="input-title"
                            placeholder="Nearest Day"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-amount">Amount</label>
                        <input type="number"
                            value={this.props.item.amount}
                            {...amount = this.props.item.amount}
                            // onChange={this.updateRating.bind(this)}
                            className="form-control"
                            id="input-rating"
                            placeholder="Nearest Dollar"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-type">Type</label>
                        <select
                            value={this.props.item.type}
                            {...type = this.props.item.type}
                            // onChange={this.updateRating.bind(this)}
                            className="form-control"
                            id="input-rating"
                            placeholder="Please Select"
                            required>
                            <option>FOOD</option>
                            <option>LODGING</option>
                            <option>TRAVEL</option>
                            <option>OTHER</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="input-description">Description</label>
                    <textarea className="form-control"
                        value={this.props.item.description}
                        {...description = this.props.item.description}
                        // onChange={this.updateDescription.bind(this)}
                        id="description"
                        required/>
                </div>
                <button type="button"
                    onClick={this.updateReimbursement}
                    value={(new Item(title, amount, type, description, dateOfExpense)).toString()}
                    className="btn btn-primary">Add</button>
            </form>
        </div>
    );
  }
}