// function initRequest() {

// }

function addMovie() {
  const year = parseInt(document.getElementById('input-year').value);
  const title = document.getElementById('input-title').value;
  const rating = parseInt(document.getElementById('input-rating').value);
  const description = document.getElementById('description').value;

  const movie = {year, title, rating, description};

  fetch('http://localhost:3001/movies', {
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'POST'
  })
  .then(resp => {
    if (resp.status === 401 || resp.status === 403) {
      alert('invalid permissions')
      throw 'Invalid permissions';
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

let itemList = [];
function addItem() {
  console.log(itemList);
  console.log(document.getElementById('input-date'))
  const dateOfExpense = document.getElementById('input-date').valueAsDate.getTime();
  const title = document.getElementById('input-title').value;
  const amount = parseInt(document.getElementById('input-amount').value);
  const type = document.getElementById('input-type').value;
  const description = document.getElementById('input-description').value;

  const item = {dateOfExpense, title, amount, type, description};
  itemList.push(item);

  body = document.getElementById('item-table');

  const row = document.createElement('tr');
  let data = document.createElement('td');
  let options = { month: "long", day: "numeric", year: "numeric" };
  data.innerText = new Date(dateOfExpense).toLocaleDateString("en-US", options);
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = title;
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = amount;
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = type;
  row.appendChild(data);

  data = document.createElement('td');
  data.innerText = description;
  row.appendChild(data);

  body.appendChild(row);

  // fetch('http://localhost:3001/movies', {
  //   body: JSON.stringify(movie),
  //   headers: {
  //     'content-type': 'application/json'
  //   },
  //   credentials: 'include',
  //   method: 'POST'
  // })
  // .then(resp => {
  //   if (resp.status === 401 || resp.status === 403) {
  //     alert('invalid permissions')
  //     throw 'Invalid permissions';
  //   }
  //   return resp.json();
  // })
  // .then(data => {
  //   alert('created') // this is horrible, never use alerts
  // })
  // .catch(err => {
  //   console.log(err);
  // });
}

function saveRequest() {
  
  fetch('http://localhost:3001/employees/submit', {
    body: JSON.stringify(itemList),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'POST'
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