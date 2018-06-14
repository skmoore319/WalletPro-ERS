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
      let greetingPanel = document.getElementById('greeting-panel');
      let elem = document.createElement('h1');
      elem.innerText = `Hello, ${user.firstName}`;
      if (user.username === 'boss') {elem.innerText += ` ${user.lastName}`;}
      greetingPanel.appendChild(elem);
      if (user.role === 'admin') {
        let barList = document.getElementById("nav-list");
        
        buildDropdown();
        retrievePending();
      }
      else {
        let barList = document.getElementById('nav-list');
        let itemContainer = document.createElement('li');
        itemContainer.className = 'nav-item active';
        let submitLink = document.createElement('a')
        submitLink.className = 'unset-anchor nav-link';
        submitLink.setAttribute('href', '/add-request/index.html');
        submitLink.innerText = 'Submit New Request';
        itemContainer.appendChild(submitLink);
        barList.appendChild(itemContainer);
        retrieveRequests();
      }
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-menu');
      body.innerText = `Sorry. I still don't know who you are.`
    });
    
}

function buildDropdown() {
  let barList = document.getElementById('nav-list');
  let itemContainer = document.createElement('li');
  itemContainer.className = 'nav-item active dropdown';
  barList.appendChild(itemContainer);
  let dropLink = document.createElement('a');
  dropLink.className = 'nav-link dropdown-toggle pointer';
  dropLink.id = 'dropdown04';
  dropLink.setAttribute('data-toggle', 'dropdown');
  dropLink.setAttribute('aria-haspopup', 'true');
  dropLink.setAttribute('aria-expanded', 'false');
  dropLink.innerText = "Selection"
  itemContainer.appendChild(dropLink);
  let dropMenu = document.createElement('div');
  dropMenu.className = 'dropdown-menu';
  dropMenu.id = 'selection-dropdown-menu';
  dropMenu.setAttribute('aria-labelledby', 'dropdown04');
  itemContainer.appendChild(dropMenu);
  
  let nextItem = document.createElement('div');
  nextItem.className = 'dropdown-item';
  dropMenu.appendChild(nextItem);
  let approveButton = document.createElement('button');
  approveButton.className = 'btn btn-primary';
  approveButton.setAttribute('onclick', 'processSelection(this.innerText);');
  approveButton.innerText = 'Approve';
  nextItem.appendChild(approveButton);
  
  nextItem = document.createElement('div');
  nextItem.className = 'dropdown-item';
  dropMenu.appendChild(nextItem);
  let denyButton = document.createElement('button');
  denyButton.className = 'btn btn-danger';
  denyButton.setAttribute('onclick', 'processSelection(this.innerText);');
  denyButton.innerText = 'Deny';
  nextItem.appendChild(denyButton);
  
}

let activeUser;
function pullUser() {
  fetch('http://localhost:3001/employees/username/identify', {credentials: 'include'})
    .then(resp => resp.json())
    .then((user) => {
      activeUser=user;
    })
    .catch(err => {
      console.log(err);
    });
}

function searchUser() {
  let searchBox = document.getElementById('search-field');
  let inputUsername = searchBox.value;
  // console.log(inputUsername);
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


      // console.log('Reached Milestone')

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
      
      let greetingPanel = document.getElementById('greeting-panel');
      let elem = document.createElement('h2');
      elem.innerText = `You have ${reimbursements.length} pending requests`
      greetingPanel.appendChild(elem);
      const header = document.getElementById('table-head-row');

      // Sort the reimbursements into descending order
      reimbursements.sort((a, b) => {return b.timeSubmitted - a.timeSubmitted});

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
      
      data = document.createElement('th');
      data.setAttribute("scope", "col");
      data.innerText = 'Selected'
      header.appendChild(data);
      

      const body = document.getElementById('main-table');
      body.innerHTML = '';
      
      for (let r of reimbursements) {
        addReimbursement(r, reimbursements.indexOf(r))
      }
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
    targetReimbursement = targets[0];
    return targets[0];
  })
  .catch(err => {
    console.log(err);
  });
}

function processSelection(action) {
  let selected = [];
  let checks = document.querySelectorAll("input[type='checkbox']");
  for (let e of checks) {
    if (e.checked) {
      // Need to get the reimbursement item from the associated checkbox element
      let searchScope = e.parentElement.parentElement.parentElement.parentElement;
      let searchKey = searchScope.getElementsByClassName("partition-key")[0].innerText;
      let searchElement = searchScope.getElementsByClassName("sort-key")[0].id;
      let numItems = searchScope.getElementsByClassName("num-items")[0].innerText;
      let newStatus = searchScope.getElementsByClassName("request-status")[0].innerText;
      let approvingAdmin = searchScope.getElementsByClassName("approving-admin")[0].innerText;
      let currentItems = [];
      let itemRows = document.getElementsByClassName(`${searchKey} ${searchElement}`);
      for (let r of itemRows) {
        
        let nextItem = {
          description: r.getElementsByClassName('item-description')[0].innerText,
          amount: Number.parseInt(r.getElementsByClassName('item-amount')[0].innerText),
          title: r.getElementsByClassName('item-title')[0].innerText,
          type: r.getElementsByClassName('item-type')[0].innerText,
          dateOfExpense: Number.parseInt(r.getElementsByClassName('date-of-expense')[0].firstChild.nextSibling.innerText)
        }
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
  
  fetch('http://localhost:3001/admins/requests/approve-deny', {
    body: JSON.stringify(selected),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT'
  })
  .then(resp => {
    window.location = '../users/index.html';
    
  })
  
  .catch(err => {
    console.log(err);
  });
}

function retrieveRequests() {
  fetch(`http://localhost:3001/employees/username`, {credentials: 'include'})
    .then(resp => resp.json())    
    .then((reimbursements) => {
      let greetingPanel = document.getElementById('greeting-panel');
      let elem = document.createElement('h2');
      elem.innerText = `You have submitted ${reimbursements.length} requests`
      greetingPanel.appendChild(elem);
      const header = document.getElementById('table-head-row');

      reimbursements.sort((a, b) => {return b.timeSubmitted - a.timeSubmitted});

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
      for (let r of reimbursements) {
        addReimbursement(r, reimbursements.indexOf(r))
      }
    })
    .catch(err => {
      console.log(err);
      const body = document.getElementById('main-table');
      body.innerText = 'Unable to retreive data';
    });
    
}

function addReimbursement(reimbursement, index) {
  const body = document.getElementById('main-table');

  let row = document.createElement('tr'); // create <tr>
  row.className = 'clickable';
  row.setAttribute('data-toggle', 'collapse');
  row.setAttribute(`data-target`, `.accordion-${index}`)
  
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
  switch (reimbursement.status){
    case 'Approved':
      row.className = 'approved';
      break;
    case 'Denied':
      row.className = 'denied';
      break;
    default:
      row.className = 'pending';
  }
  
  data = document.createElement('td');
  data.className = "approving-admin"
  data.innerText = reimbursement.approver;
  row.appendChild(data);

  if (activeUser.role === 'admin') {
    let space = document.createElement('td');
    data = document.createElement('div');
    data.className = 'checkbox';
    let label = document.createElement('label');
    let check = document.createElement('input');
    check.setAttribute('value', '');
    check.setAttribute('type', 'checkbox');
    // check.setAttribute('onclick', 'stopPropagation();')
    label.appendChild(check);
    data.appendChild(label);
    space.appendChild(data);
    row.appendChild(space);
  }
  
  body.appendChild(row); // append the row to the body
  

  row = document.createElement('tr');
  row.className = `item-header collapse accordion-${index}`;
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
    addItem(i, reimbursement.username, reimbursement.timeSubmitted, index);
  }

}

function addItem(item, username, timeStamp, index) {
  
  const body = document.getElementById('main-table');
  const row = document.createElement('tr');
  row.className = `${username} ${timeStamp.toString()} collapse accordion-${index}`;

  let data = document.createElement('td');
  data.className = 'date-of-expense';
  let options = { month: "long", day: "numeric", year: "numeric" };
  item.dateOfExpense
    ? data.innerText = new Date(item.dateOfExpense).toLocaleDateString("en-US", options)
    : data.innerText = new Date(item.timeOfExpense).toLocaleDateString("en-US", options);
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
