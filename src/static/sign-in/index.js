// We will save the input username to the browser to keep track of the 
// user currently logged in.
function saveData(user) {
  let activeUser = {
    User: user,
  };
  // Convert this JSON object to a string
  activeUser = JSON.stringify(activeUser);
  // Create a base-64 encoded ASCII string to ensure no transmission problems
  activeUser = btoa(activeUser);
  // Save the encoded username to web storage
  localStorage.setItem('_activeUser', activeUser);
}

function login() {
  const username = document.getElementById('inputUsername').value;
  const password = document.getElementById('inputPassword').value;

  const credential = {username, password}; // this will create an object like {username: 'blake', password: 'pass'} based on the values in those variables

  fetch('http://localhost:3001/validate/login', {
    body: JSON.stringify(credential),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'POST'
  })
  .then(resp => {
    console.log(resp.status)
    if (resp.status === 401) {
      throw 'Invalid Credentials';
    }
    if (resp.status === 404) {
      throw  `You don't exist`;
    }
    if (resp.status === 200) {
      // console.log(resp.json());
      saveData(username);
      return resp.json();
    }
    throw 'Unable to login at this time, please try again later';
  })
  .then(data => {
    window.location = '../users/index.html';
  })
  .catch(err => {
    document.getElementById('error-message').innerText = err;
  })

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
