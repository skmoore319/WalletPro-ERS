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

// We need some lesser functionality from this function here.
function getCurrentUser() {
  fetch('http://localhost:3001/employees/username/identify', {credentials: 'include'})
    .then(resp => resp.json())
    .then((user) => {
      // console.log(user);
      const body = document.getElementById('main-menu');
      let elem = document.createElement('h1');
      elem.innerText = `Hello, ${user.firstName}`;
      if (user.username === 'boss') {elem.innerText += ` ${user.lastName}`;}
      body.appendChild(elem);
      // console.log(user.role);
      if (user.role === 'admin') {retrievePending();}
      else {retrieveRequests()};
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-menu');
      body.innerText = `Sorry. I still don't know who you are.`
    });
    
}
let activeUser;
function pullUser() {
  fetch('http://localhost:3001/employees/username/identify', {credentials: 'include'})
    .then(resp => resp.json())
    .then((user) => {
      // console.log(user);
      // console.log(user.role === 'admin')
      activeUser=user;
    })
    .catch(err => {
      console.log(err);
    });
}


function retrievePending() {
  fetch(`http://localhost:3001/admins/requests/pending`)
    .then(resp => resp.json())
    .then((reimbursements) => {

      // console.log(activeUser)
      
      const mainCount = document.getElementById('main-menu');
      let elem = document.createElement('h2');
      elem.innerText = `You have ${reimbursements.length} pending requests`
      mainCount.appendChild(elem);
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

      // console.log(activeUser);

      
      // console.log('Passed admin check')
      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Selected'
      header.appendChild(data);
      

      const body = document.getElementById('main-table');
      body.innerHTML = '';
      
      reimbursements.forEach(addReimbursement);
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-table');
      body.innerText = 'Unable to retreive data';
    });
}

let targetReimbursement;
function findReimbursement(username, timeStamp) {
  fetch(`http://localhost:3001/admins/requests/${username}/${timeStamp}`, {credentials: 'include'})
  .then(resp =>  resp.json())
  .then((targets) => {
    console.log(targets);
    targetReimbursement = targets[0];
    console.log(targetReimbursement);
    return targets[0];
  })
  .catch(err => {
    console.log(err);
  });
}

function processSelection(action) {
  console.log('entered processSelection()')
  let selected = [];
  let checks = document.querySelectorAll("input[type='checkbox']");
  console.log(checks)
  for (let e of checks) {
    console.log(e.value);
    if (e.checked) {
      // Need to get the reimbursement item from the associated checkbox element
      let searchScope = e.parentElement.parentElement.parentElement.parentElement.parentElement;
      let searchKey = searchScope.getElementsByClassName("partition-key")[0];
      let searchElement = searchScope.getElementsByClassName("sort-key")[0];
      // targetReimbursement = findReimbursement(searchKey.innerText, searchElement.id);
      fetch(`http://localhost:3001/admins/requests/${searchKey.innerText}/${searchElement.id}`, {credentials: 'include'})
        .then(resp =>  resp.json())
        .then((targets) => {
          console.log(targets);
          targetReimbursement = targets[0];
          // console.log(targetReimbursement);
          selected.push(targets[0]);
          // console.log(selected)
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(targetReimbursement);
      // selected.push(targetReimbursement);
    }
  }
  console.log(selected)
  console.log(action);
  console.log(selected[0].status)
  for (let f = 0; f < selected.length; f++) {
    console.log(f);
    if (action === "Approve") {
      selected[f].status = "Approved";
    } else if (action === "Deny") {
      console.log('Entered Denied')
      selected[f].status = "Denied";
    } else {
      selected[f].status = "Pending"; // This is insurance
    }
  }
  console.log(`Selected items: ${selected}`)
  fetch('http://localhost:3001/admins/requests/approve-deny', {
    body: JSON.stringify(selected),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT'
  })
  .then(resp => {
    if (resp.status === 401 || resp.status === 403) {
      alert('invalid permissions')
      throw 'Invalid permissions';
    }
    return resp.json();
  })
  .then(data => {
    alert('Success!') // this is horrible, never use alerts
    window.location = '../users/index.html';
  })
  .catch(err => {
    console.log(err);
  });
}

function retrieveRequests() {
  // console.log(loadData());
  fetch(`http://localhost:3001/employees/username`, {credentials: 'include'})
    .then(resp => resp.json())    
    .then((reimbursements) => {
      const mainCount = document.getElementById('main-menu');
      let elem = document.createElement('h2');
      elem.innerText = `You have submitted ${reimbursements.length} requests`
      mainCount.appendChild(elem);
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
  // row.setAttribute("id", `entry-${i}`);
  // console.log(row);
  // console.log(row.id);
  
  let data = document.createElement('td'); // create <td>
  data.className = "partition-key";
  data.innerText = reimbursement.username; // assign value to the td
  row.appendChild(data); // append the td to the row
  
  data = document.createElement('td');
  let options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" };
  data.className = "sort-key";
  // Now here's a REAL kludge: let's store the numeric value of this date in the id of this element so we can
  // use it to search the database if we need to!
  data.setAttribute('id', reimbursement.timeSubmitted.toString());
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

  // let isAdmin = getCurrentUser().status === 'admin';
  if (activeUser.role === 'admin') {
    // console.log('Passed admin check')
    let space = document.createElement('td');
    data = document.createElement('div');
    data.className = 'checkbox';
    let label = document.createElement('label');
    // label.setAttribute('for', 'selected');
    let check = document.createElement('input');
    check.setAttribute('value', '');
    check.setAttribute('type', 'checkbox');
    label.appendChild(check);
    data.appendChild(label);
    space.appendChild(data);
    row.appendChild(space);
  }
  
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