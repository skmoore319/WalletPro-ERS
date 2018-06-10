function retrieveRequests() {
  fetch('http://localhost:3001/employees/skmoore/requests', {credentials: 'include'})
    .then(resp => resp.json())    
    .then((reimbursements) => {
      
      const body = document.getElementById('main-table');
      body.innerHTML = '';
      // Start here.
      reimbursements.forEach(addReimbursement);
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-table');
      body.innerText = 'Unable to retreive data';
    });
    
}

function addReimbursement(reimbursement) {
  const body = document.getElementById('main-table');

  const row = document.createElement('tr'); // create <tr>
  
  let data = document.createElement('td'); // create <td>
  data.innerText = reimbursement.username; // assign value to the td
  row.appendChild(data); // append the td to the row
  
  data = document.createElement('td');
  let options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" };
  data.innerText = new Date(reimbursement.timeSubmitted).toLocaleDateString("en-US", options);
  row.appendChild(data);
  
  data = document.createElement('td');
  data.innerText = reimbursement.items.length;
  row.appendChild(data);
  
  data = document.createElement('td');
  data.innerText = reimbursement.status;
  row.appendChild(data);
  
  data = document.createElement('td');
  data.innerText = reimbursement.approver;
  row.appendChild(data);
  
  body.appendChild(row); // append the row to the body
}

function retreiveMovies() {
  const year = document.getElementById('year-input').value;
  fetch('http://localhost:3001/movies/year/' + year, {credentials: 'include'})
    .then(resp => {
      console.log(resp.status)
      if(resp.status === 401 || resp.status === 403) {
        return;
      }
      return resp.json();
    })
    .then((movies) => {

      // clear table
      const body = document.getElementById('movie-table-body');
      body.innerHTML = '';

      // populate the table for each movie
      movies.forEach(addMovie);
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('movie-table-body');
      body.innerText = 'Unable to retreive data';
    });
}

function addMovie(movie) {
  const body = document.getElementById('movie-table-body');

  const row = document.createElement('tr'); // create <tr>
  let data = document.createElement('td'); // create <td>
  data.innerText = movie.year; // assign value to the td
  row.appendChild(data); // append the td to the row
  data = document.createElement('td');
  data.innerText = movie.title;
  row.appendChild(data);
  data = document.createElement('td');
  data.innerText = movie.rating;
  row.appendChild(data);
  data = document.createElement('td');
  data.innerText = movie.description;
  row.appendChild(data);
  body.appendChild(row); // append the row to the body

  // body.innerHTML += `
  //   <tr>
  //     <td>${movie.year}</td>
  //     <td>${movie.title}</td>
  //     <td>${movie.rating}</td>
  //     <td>${movie.description}</td>
  //   </tr>
  // `;
}