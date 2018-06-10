import { requestTypes } from './../actions/request/request.types';
import { IRequestListState } from './index';
import { Item } from '../model/Item';


const initialState: IRequestListState = {
  // description: '',
//   movieForm: {
//     description: '',
//     rating: 0,
//     title: '',
//     year: 0,
//   },
  item: new Item('', 0, 'OTHER', '', new Date()),
  requests: [],
  // rating: 0,
  // title: '',
//   year: new Date().getFullYear(),
  
}

export const requestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case requestTypes.UPDATE_LIST:
        return {
            ...state,
            item: action.payload.request
        };
    case requestTypes.UPDATE_TYPE:
        return {
            ...state,
            requests: action.payload.type
        };
    case requestTypes.UPDATE_DATE:
        return {
            ...state,
            requests: action.payload.dateOfExpense
        };
    case requestTypes.UPDATE_AMOUNT:
        return {
            ...state,
            requests: action.payload.amount
        };
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
        item: {
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
