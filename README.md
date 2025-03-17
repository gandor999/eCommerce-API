# eCommerce-API
Second capstone project at boot camp.


Hello,

  - This project was simulated using POSTMAN as its http request manager
  - I erased the mongodb connection string that was used to test out the API, please use another mongodb connection string
  - The API can login, register, set a user as admin, create a product, update a product, archive a product, create an order, view logged in user's orders, and view all orders made
  - Please insert the access token in the authorization header and set it to bearer token, the access token can be retrieved when a user sends a login request
  - I suggest also using POSTMAN for the http request so that you can use the already exported collection for requests
  - For the login please use the email of the user and password
  

  Please enjoy!


PS There is only 1 commit here so that the mongodb connection string can't be viewed

## How to run
`npm start`

## Renovations

Renovate to typescript and re organize cringe code

Todo:
- [x] put all into one `src` dir for the js files
- [x] follow https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
- [x] make sure procfile is now `node src/index` or i think `node build/src/index` or whatever we'll figure it out
- [ ] check if heroku is still free, try vercel for hosting if isnt anymore 
- [x] make security dir be ts
- [x] make utility functions be ts and rename to utils
- [x] do error handling
- [x] make util be ts
- [ ] make product be ts
- [ ] make orders be ts
- [x] make users be ts
- [ ] make services part
- [x] convert routest to controllers and make this more object oriented
- [x] make users more oop
