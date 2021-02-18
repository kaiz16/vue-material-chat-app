
Boiler code [here](https://github.com/kaiz16/vue-material-chat-app-frontend)

Clone the repo and run ```npm install``` in backend directory and in frontend directory.

To run frontend => ```npm run serve```  in frontend directory.
 
To run the server app => ```node index.js``` in root directory.

Resources

UI 
https://vuematerial.io/  

Socket.io (For live subscriptions)  
https://socket.io/

The link to deployed chat app is here.  
https://vue-material-chat-app-frontend.herokuapp.com/

# API
https://vue-material-chat-app-backend.herokuapp.com 

Examples below

Authenticate a user (Returns JWT)(POST)  
> ```/api/users/login```  

Create a user (Returns JWT)(POST)  
> ```/api/users/create```

Get all messages(GET)  
> ```/api/messages```

To send a message(POST)  
> ```/api/messages/create```

Examples using fetch

Register or authenticate a user

```javascript
// to authenticate user
var routeName = '/api/users/login'
// to register user
var routeName = '/api/users/create'
// concatenate url
var url = 'https://vue-material-chat-app-backend.herokuapp.com' + routeName

fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    userName: 'foo',
    password: 'bar',
  }),
  headers: {
    'Content-type': 'application/json'
  },
})
  .then((response) => response.json())
// this will return you a jwt token
  .then((json) => console.log(json));
```

Get messages
```javascript
var routeName = '/api/messages'
var url = 'https://vue-material-chat-app-backend.herokuapp.com' + routeName

fetch(url, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json'
    'auth-token': JWT_TOKEN
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

Create new message
```javascript
var routeName = '/api/messages/create'
var url = 'https://vue-material-chat-app-backend.herokuapp.com' + routeName

fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    userName: 'foo',
    text: 'Hello world'
  }),
  headers: {
    'Content-type': 'application/json',
    'auth-token': JWT_TOKEN
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```