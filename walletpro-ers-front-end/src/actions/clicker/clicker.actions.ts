import { clickerTypes } from './clicker.types';

export const increment = (amount: number) => {
  return {
    payload: {
      amount
    },
    type: clickerTypes.INCREMENT,
  }
}

export const buyAuto = (amount: number) => (dispatch:any) => {
  dispatch ({
    payload: {
      amount: -50
    },
    type: clickerTypes.INCREMENT
  })

  setInterval(() => {
    dispatch({
      payload: {
        amount
      },
      type: clickerTypes.INCREMENT
    })
  }, 1000)
}