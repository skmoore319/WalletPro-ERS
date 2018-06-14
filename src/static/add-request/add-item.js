let itemList = [];
function addItem() {
  console.log(itemList);
  console.log(document.getElementById('input-date').valueAsDate);
  let dateString = document.getElementById('input-date').valueAsDate;
  const dateOfExpense = Date.parse(dateString);
  const title = document.getElementById('input-title').value;
  const amount = parseInt(document.getElementById('input-amount').value);
  const type = document.getElementById('input-type').value;
  const description = document.getElementById('input-description').value;

  const item = {dateOfExpense, title, amount, type, description};
  itemList.push(item);

  body = document.getElementById('item-table');

  const row = document.createElement('tr');
  let data = document.createElement('td');
  let options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" };
  data.innerText = new Date(dateOfExpense).toLocaleDateString("en-US");
  let tag = document.createElement('div');
  tag.innerText = dateOfExpense.toString();
  tag.setAttribute('hidden', 'true');
  data.appendChild(tag);
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
    window.location = '../users/index.html';
  })
  .catch(err => {
    console.log(err);
  });
}