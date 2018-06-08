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

export const updateMovies = (year: number) => (dispatch: any) => {
    fetch('localhost:3001/movies/year/' + year, {credentials: 'include'})
    .then(resp => {
    //   console.log(resp.status)
      if(resp.status === 401 || resp.status === 403) {
        return;
      }
      return resp.json();
    })
    .then((movies) => {
        dispatch({
            payload: {
              movies
            },
            type: requestTypes.UPDATE_MOVIES,
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