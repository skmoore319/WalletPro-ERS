import { requestTypes } from './../actions/request/request.types';
import { IRequestListState } from './index';


const initialState: IRequestListState = {
  // description: '',
//   movieForm: {
//     description: '',
//     rating: 0,
//     title: '',
//     year: 0,
//   },
  requests: [],
  // rating: 0,
  // title: '',
//   year: new Date().getFullYear(),
  
}

export const requestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case requestTypes.UPDATE_YEAR:
      return {
        ...state,
        year: action.payload.year
      };
    case requestTypes.UPDATE_MOVIES:
      return {
          ...state,
          movies: action.payload.movies,
          year: new Date().getFullYear(),
          
      }
    case requestTypes.UPDATE_FORM:
      return {
        ...state,
        movieForm: action.payload.movieForm
      }
    case requestTypes.UPDATE_TITLE:
      return {
        ...state,
        movieForm: {
          ...state.requests,
          title: action.payload.title
        }
      }
    case requestTypes.UPDATE_RATING:
      console.log(typeof(action.payload.rating))
      console.log(typeof(Number.parseInt(action.payload.rating)))
      return {
        ...state,
        movieForm: {
          ...state.requests,
          rating: Number.parseInt(action.payload.rating)
        }
      }
    case requestTypes.UPDATE_DESCRIPTION:
      return {
        ...state,
        movieForm: {
          ...state.requests,
          description: action.payload.description
        }
      }
    };
  return state;
}
