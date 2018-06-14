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

function searchUser() {
  let searchBox = document.getElementById('search-field');
  let inputUsername = searchBox.value;
  console.log(inputUsername);
  fetch(`http://localhost:3001/admins/users/${inputUsername}`, {credentials: 'include'})
    .then(resp => resp.json())
    .then((reimbursements) => {
      // const body = document.getElementById('main-menu');
      // let elem = document.createElement('h1');
      // elem.innerText = `Hello, ${user.firstName}`;
      // if (user.username === 'boss') {elem.innerText += ` ${user.lastName}`;}
      // body.appendChild(elem);
      // console.log(user.role);
      // if (user.role === 'admin') {retrievePending();}


      console.log('Reached Milestone')

      const mainCount = document.getElementById('main-menu');
      let elem = document.createElement('h2');
      elem.innerText = `${reimbursements[0].username} has submitted ${reimbursements.length} requests`
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
    })
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
    // console.log(e.value);
    if (e.checked) {
      // Need to get the reimbursement item from the associated checkbox element
      let searchScope = e.parentElement.parentElement.parentElement.parentElement;
      let searchKey = searchScope.getElementsByClassName("partition-key")[0].innerText;
      let searchElement = searchScope.getElementsByClassName("sort-key")[0].id;
      console.log(searchScope.getElementsByClassName("sort-key"));
      let numItems = searchScope.getElementsByClassName("num-items")[0].innerText;
      let newStatus = searchScope.getElementsByClassName("request-status")[0].innerText;
      let approvingAdmin = searchScope.getElementsByClassName("approving-admin")[0].innerText;
      let currentItems = [];
      let itemRows = document.getElementsByClassName(`${searchKey} ${searchElement}`);
      // console.log(itemRows);
      for (let r of itemRows) {
        // console.log(r.getElementsByClassName('date-of-expense')[0].firstChild.nextSibling.innerText);
        
        let nextItem = {
          description: r.getElementsByClassName('item-description')[0].innerText,
          amount: Number.parseInt(r.getElementsByClassName('item-amount')[0].innerText),
          title: r.getElementsByClassName('item-title')[0].innerText,
          type: r.getElementsByClassName('item-type')[0].innerText,
          dateOfExpense: Number.parseInt(r.getElementsByClassName('date-of-expense')[0].firstChild.nextSibling.innerText)
        }
        // console.log(nextItem);
        currentItems.push(nextItem);
      }
      // console.log(currentItems);
      // targetReimbursement = findReimbursement(searchKey.innerText, searchElement.id);
      // fetch(`http://localhost:3001/admins/requests/${searchKey.innerText}/${searchElement.id}`, {credentials: 'include'})
      //   .then(resp =>  resp.json())
      //   .then((targets) => {
      //     console.log(targets);
      //     targetReimbursement = targets[0];
      //     // console.log(targetReimbursement);
      //     selected.push(targets[0]);
      //     // console.log(selected)
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // console.log(targetReimbursement);
      let targetReimbursement = {
        timeSubmitted: Number.parseInt(searchElement),
        username: searchKey,
        receipts: [],
        items: currentItems,
        status: newStatus,
        approver: activeUser.username
      }
      selected.push(targetReimbursement);
    }
  }
  console.log(selected)
  // console.log(selected[0])
  // console.log(action);
  
//   let test = [
//     {
//       timeSubmitted: 1528909570460,
//       username: "jscript",
//       receipts: [],
//       items: [
//           {
//               description: "Work tools",
//               amount: 37,
//               title: "tools1",
//               type: "OTHER",
//               dateOfExpense: 1527724800000
//           },
//           {
//               description: "Gas to Orlando",
//               amount: 49,
//               title: "travel7",
//               type: "TRAVEL",
//               dateOfExpense: 1527811200000
//           }
//       ],
//       status: "Pending",
//       approver: "none"
//   }
// ]
  for (let f of selected) {
    console.log(f);
    if (action === "Approve") {
      f.status = "Approved";
    } else if (action === "Deny") {
      console.log('Entered Denied')
      f.status = "Denied";
    } else {
      f.status = "Pending"; // This is insurance
    }
  }
  // console.log(`Selected items: ${selected[0].status}`)
  // console.log(selected[0])
  
  fetch('http://localhost:3001/admins/requests/approve-deny', {
    body: JSON.stringify(selected),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT'
  })
  .then(resp => {
    alert('Success!') // this is horrible, never use alerts
    window.location = '../users/index.html';
    // if (resp.status === 401 || resp.status === 403) {
    //   alert('invalid permissions')
    //   throw 'Invalid permissions';
    // }
    // return resp.json();
  })
  // .then(data => {
  //   alert('Success!') // this is horrible, never use alerts
  //   window.location = '../users/index.html';
  // })
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
  data.className = "num-items";
  data.innerText = reimbursement.items.length;
  row.appendChild(data);
  
  data = document.createElement('td');
  data.className = "request-status"
  data.innerText = reimbursement.status;
  row.appendChild(data);
  
  data = document.createElement('td');
  data.className = "approving-admin"
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

  for (let i of reimbursement.items) {
    addItem(i, reimbursement.username, reimbursement.timeSubmitted);
  }

  // reimbursement.items.forEach(addItem, reimbursement.username, reimbursement.timeSubmitted);
}

function addItem(item, username, timeStamp) {
  console.log(item);
  console.log(username);
  console.log(timeStamp);
  const body = document.getElementById('main-table');
  const row = document.createElement('tr');
  row.classList.add(`${username}`, `${timeStamp.toString()}`);

  let data = document.createElement('td');
  data.className = 'date-of-expense';
  item.dateOfExpense ? data.innerText = item.dateOfExpense : data.innerText = item.timeOfExpense;
  let tag = document.createElement('div');
  item.dateOfExpense ? tag.innerText = item.dateOfExpense : tag.innerText = item.timeOfExpense;
  tag.setAttribute('hidden', 'true');
  data.appendChild(tag);
  row.appendChild(data);

  data = document.createElement('td');
  data.className = 'item-title';
  data.innerText = item.title;
  row.appendChild(data);

  data = document.createElement('td');
  data.className = 'item-amount';
  data.innerText = item.amount;
  row.appendChild(data);

  data = document.createElement('td');
  data.className = 'item-type';
  item.type ? data.innerText = item.type: data.innerText = '-N/A-';
  row.appendChild(data);

  data = document.createElement('td');
  data.className = 'item-description';
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