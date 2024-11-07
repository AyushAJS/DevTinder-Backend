# devTinder API

## authRouter
 - POST /signup
 - POST /login
 - POST /logout 

## profileRouter
 - GET /profile/view
 - PATCH /profile/edit      -   email and password cannot edited
 - PATCH /profile/password      -   updation in password

## connectionRequestRouter
 - status: pass (ignored), like (interested), accepted, rejected
 - POST /request/send/:status/:userId  -   status: interested, ignored
 - POST /request/review/:status/:requestId  -   status: accepted, rejected

## userRouter
 - GET /user/connections
 - GET /user/requests/received
 - GET /user/feeds   -   gets the profiles of other users on platform
 
 - /feed?page=1&limit=10 => first 10 users data 1-10    :   .skip(0) & limit(10)
 - /feed?page=3&limit=10 => next 10 users data  11-20   :   .skip(10) & limit(10)
 - /feed?page=4&limit=10 => next 10 users data  21-30   :   .skip(20) & limit(10)
 - /feed?page=5&limit=10 => next 10 users data  31-40   :   .skip(30) & limit(10)


#   if we show all the users in feed page then our app will slow because it will take the time to so we limit the users so that at a time it will show a fixed number of users data. API understand "page=no?limit=val" and mongodb understand "skip or limit"
    .skip()  -   how many documents skip from the first
    .limit() -   how many documents you want

 


















