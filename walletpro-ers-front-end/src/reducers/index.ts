import { requestReducer } from './request.reducer';
import { Reimbursement } from './../model/Reimbursement';
// import { movieReducer } from './movie.reducer';
import { combineReducers } from "redux";
// import { ticTacToeReducer } from "./tic-tac-toe.reducer";
import { clickerReducer } from "./clicker.reducer";
import { signInReducer } from "./sign-in.reducer";
// import { Movie } from "../model/Movie"


export interface ISignIn {
  username: string,
  password: string,
  errorMessage: string
}

// export interface ITicTacToeState {
//   game: string[][],
//   message: string,
//   playerTurn: boolean, // true p1, false p2
//   winner: number
// }

// export interface IMovieTable {
//   // description: string,
//   movies: Movie[],
//   // rating: number,
//   // title: string,
//   year: number,
//   movieForm: Movie
// }

// export interface INewMovie {
//   newMovie: Movie
// }

export interface IRequestListState {
  requests: Reimbursement[]
}

export interface IState {
  clicker: {
    clicks: number
  },
  request: IRequestListState,
  // ticTacToe: ITicTacToeState,
  signIn: ISignIn,
  // movie: IMovieTable,
};

export const state = combineReducers<IState>({
  clicker: clickerReducer,
  request: requestReducer,
  // movie: movieReducer,
  signIn: signInReducer,
  // ticTacToe: ticTacToeReducer,
  
});