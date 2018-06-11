function loadData() {
  let activeUser = localStorage.getItem('_activeUser');
   if (!activeUser) {
     
      window.location = '../login/index.html';
      return;
    }
   localStorage.removeItem('_activeUser');
   // Decode the string data from the base-64 encode
   activeUser = atob(activeUser);
   // Parses to Object the JSON string
   activeUser = JSON.parse(activeUser);
   // Do what you need with the Object
   return {
     "currentUser": activeUser
   };
}

function logout() {
  fetch('http://localhost:3001/validate/logout', {
    body: JSON.stringify(credential),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'DELETE'
  })
  .then(resp => {
    if (resp.status === 200) {
      // console.log(resp.json());
      return resp.json();
    }
    throw 'Unable to logout at this time, please try again later';
  })
  .then(data => {
    window.location = '../sign-in/index.html';
  })
  .catch(err => {
    document.getElementById('error-message').innerText = err;
  })
}

function getCurrentUser() {
  fetch('http://localhost:3001/employees/username/identify', {credentials: 'include'})
    .then(resp => resp.json())
    .then((user) => {
      console.log(user);
      const body = document.getElementById('main-menu');
      let elem = document.createElement('h1');
      elem.innerText = `Hello, ${user.firstName}`;
      body.appendChild(elem);
      retrieveRequests();
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-menu');
      body.innerText = `Sorry. I still don't know who you are.`
    });
    
}

function retrieveRequests() {
  console.log(loadData());
  fetch(`http://localhost:3001/employees/username`, {credentials: 'include'})
    .then(resp => resp.json())    
    .then((reimbursements) => {
      const mainCount = document.getElementById('main-menu');
      let elem = document.createElement('h2');
      elem.innerText = `You have submitted ${reimbursements.length} requests`
      const header = document.getElementById('table-head-row');

      let data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Submitted by'
      header.appendChild(data);

      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Date Of Submission'
      header.appendChild(data);

      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Number Of Items'
      header.appendChild(data);

      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Status'
      header.appendChild(data);

      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Approver'
      header.appendChild(data);

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

  let row = document.createElement('tr'); // create <tr>
  
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

  row = document.createElement('tr');
  data = document.createElement('th');
  data.innerText = 'Time Created';
  row.appendChild(data);

  data = document.createElement('th');
  data.innerText = 'Title';
  row.appendChild(data);

  data = document.createElement('th');
  data.innerText = 'Amount';
  row.appendChild(data);

  data = document.createElement('th');
  data.innerText = 'Type';
  row.appendChild(data);

  data = document.createElement('th');
  data.innerText = 'Description';
  row.appendChild(data);

  body.appendChild(row);

  reimbursement.items.forEach(addItem);
}

function addItem(item) {
  const body = document.getElementById('main-table');
  const row = document.createElement('tr');

  let data = document.createElement('td');
  data.innerText = item.timeOfExpense;
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = item.title;
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = item.amount;
  row.appendChild(data);

  data = document.createElement('td');
  item.type ? data.innerText = item.type: data.innerText = '-N/A-';
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = item.description;
  row.appendChild(data);

  body.appendChild(row);
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