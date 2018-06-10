import * as React from 'react';
import { IRequestListState } from '../../reducers';
import { Reimbursement } from '../../model/Reimbursement';

interface IProp extends IRequestListState {
  updateYear: (year: number) => void
  updateMovies: (year: number) => void
  updateDescription: (description: string) => void
  updateTitle: (title: string) => void
  updateRating: (rating: number) => void
  updateList: (request: Reimbursement) => void
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

    public updateRating = (e:any) => {
        const rating = e.target.value;
        this.props.updateRating(rating);
    }

    public updateYear = (e:any) => {
        const year = e.target.value;
        this.props.updateYear(year);
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
    const request: Reimbursement = new Reimbursement('skmoore', [])
    console.log(request);
    this.props.updateList(request);
    }

  public render() {
    return (
        <div className="container" id="request-add-menu">
            <form className="container" onSubmit={this.submit}>
                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="input-title">Title</label>
                        <input type="type"
                            // value={this.props.year}
                            // onChange={this.updateYear.bind(this)}
                            className="form-control"
                            id="input-year"
                            placeholder="Title"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-date-of-expense">Date Of Expense</label>
                        <input type="date"
                            // value={this.props.movieForm.title}
                            // onChange={this.updateTitle.bind(this)}
                            className="form-control"
                            id="input-title"
                            placeholder="Nearest Day"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-amount">Amount</label>
                        <input type="number"
                            // value={this.props.movieForm.rating}
                            // onChange={this.updateRating.bind(this)}
                            className="form-control"
                            id="input-rating"
                            placeholder="Nearest Dollar"
                            required/>
                    </div>
                    <div className="form-group col-md">
                        <label htmlFor="input-type">Type</label>
                        <select
                            // value={this.props.movieForm.rating}
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
                        // value={this.props.movieForm.description}
                        // onChange={this.updateDescription.bind(this)}
                        id="description"
                        required/>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
  }
}