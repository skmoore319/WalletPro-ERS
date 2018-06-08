import { clickerTypes } from "../actions/clicker/clicker.types";


const initialState = {
  clicks: 0
}

export const clickerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case clickerTypes.INCREMENT:
      return {
        clicks: state.clicks + action.payload.amount
      };
  }

  return state;
};
