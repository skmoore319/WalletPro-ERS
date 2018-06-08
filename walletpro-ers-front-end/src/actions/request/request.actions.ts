import { Reimbursement } from './../../model/Reimbursement';
// import { environment } from './../../environment';
import { requestTypes } from './request.types';

export const updateYear = (year: number) => {
  return {
    payload: {
      year
    },
    type: requestTypes.UPDATE_YEAR,
  }
}

export const updateTitle = (title: string) => {
  return {
    payload: {
      title
    },
    type: requestTypes.UPDATE_TITLE,
  }
}

export const updateRating = (rating: number) => {
  console.log(rating)
  return {
    payload: {
      rating
    },
    type: requestTypes.UPDATE_RATING,
  }
}

export const updateDescription = (description: string) => {
  return {
    payload: {
      description
    },
    type: requestTypes.UPDATE_DESCRIPTION
  }
}

export const updateList = (phrase: string) => (dispatch: any) => {
    
    fetch('http://localhost:3001/employees/skmoore/requests')
    .then(resp => {
      console.log('Fetching')
      if(resp.status === 401 || resp.status === 403) {
        return;
      }
      return resp.json();
    })
    .then((request) => {
      console.log(request)
        dispatch({
            payload: {
              request
            },
            type: requestTypes.UPDATE_LIST,
          })
     
    })
    .catch(err => {
    //   console.log(err);
    });
    
    
  }
  
export const updateForm = (movie: Reimbursement) => (dispatch: any) => {
  console.log(movie);
  console.log(JSON.stringify(movie))
  fetch('localhost:3000/movies', {
    body: JSON.stringify(movie),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(resp => {
    if (resp.status === 401 || resp.status === 403) {
      alert('invalid permissions')
      throw resp.status;
    }
    return resp.json();
  })
  .then(data => {
    alert('created') // this is horrible, never use alerts
  })
  .catch(err => {
    console.log(err);
  });
}