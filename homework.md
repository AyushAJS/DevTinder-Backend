
Episode No. 3 =>
 - create a repo
 - node_modules, package.json, package.lock.json
 - install express
 - create a server
 - listen to port 3000
 - write req handlers
 - install nodemon and update scripts inside package.json
 - difference between ^ (carrot) and ~ (tilde) in version of package.

Episode No. 4 =>
 - play with routes and route extensions ex: /hello, /, /xyz
 - order of the routes matter alot
 - API testing using PostMan API
 - write logic to handle HTTP requests: GET, POST, PATCH, PUT, DELETE
 - Explore routing and use of ?, +, (), * in the routes
 - use of regex in routes /a/, /.*fly$/
 - Reading the query params in the routes
 - Reading the dynamic routes

Episode No. 5 =>
 - Multiple Route Handlers
 - next()
 - next() and error comes along with res.send()
 - app.use("",rh1,[rh2,rh3],rh4,rh5)            rh: route handler
 - Read about MiddleWares
 - How express.js handles req behind the scenes
 - app.use() V/S app.all()
 - dummy middleware auth for all user routes, except /user/login
 - Error handling using app.use("/",(err,req,res,next)=>{})
 - 
 - 

Episode No. 6 =>
 - connect db "connection-url"/devTinder using mongoose
 - connect db first before starting server to listen the requests on 3000 port
 - Create userSchema and after that create a Model.
 - Create POST /signup API to add data to database
 - Push some documents using API's calls from Postman
 - Error handling using try, catch block
 - 
 - 

Episode No. 7 =>
 - difference between json object and js object.
 - add the express.json middleware to this app.
 - make signup API dynamic to receive data from the end user.
 - User.findOne with duplicate email ids, which object returned
 - API - get user by email
 - API - Feed API - /feed - get all the users from the database
 - get user by id
 - create a delete user API
 - difference between PUT and PATCH
 - API - update a user
 - Explore the mongoose docs for model methods
 - what are the options in a Model.findOneAndUpdate method, explore more about it
 - API - Updatae the user with email ID

Episode No. 8 =>
 - Explore schematype options from the docs
 - add required, unique, lowercase, min, max, minLength, maxLength, default
 - custom validation function
 - imporve the db schema - Put all require validations fields in schema
 - add timestamp in User schema
 - add API level validations on Patch request and signup Post API
 - Validations for each field       =>          senitize the data
 - Install Validator library and user it for validations like email, phone number, password and many more things
 - never trust the req.body because by this we can get mallware data.
 - 

Episode No. 9 =>
 - validate data in singup API
 - install bcrypt lib and use it for hashing pass
 - create login API
 - compare password and throw error if email and pass is invalid

 Episode No. 10 =>
 - install cookie-parser
 - just send a dummy cookie to user
 - create GET /profile API and check if you get the cookie back
 - install jsonWebToken
 - In login API , after email and password validation, create a JWT token and sent it to user
 - read the cookie inside your profile API and find the logged in user
 - userAuth middleware
 - Add the userAuth middleware in porfile API and a new sendConnection API
 - Set the expiry of JWT token and Cookies to 7 days
 - create userSchema method to getJWT()
 - create userSchema method to validatePass(passwordInputByUser)

 Episode No. 11 =>
 - explore Tinder API's
 - Create a list all API you can think of in dev Tinder.
 - Group multiple routes under respective routers
 - Read docs for express.Router
 - Create routes folder for managing auth, profile, request routers
 - create authRouter, connectionRouter, profileRouter, userRouter
 - import these routers in app.js
 - 
Episode No. 12 =>
 - read more about indexes in mongodb
 - why do we need indexes - advantages or disadvantages
 - create connectionRequestSchema
 - send connection Request API
 - proper validation of data
 - think about corner cases and handle them - for security concern
 - $or and $and query in mongoose - logical queries
 - schema.pre middleware functions

Episode No. 13 =>
 - code with proper validations for POST /request/review/:status/:requestId
 - Thought Process - POST v/s GET
 - Read more about "ref and populate" from https://mongoosejs.com/docs/populate.html
 - GET /user/requests/received with all the checks
 - GET /user/connections with all the checks

 Episode No. 14 =>
 - logic for GET /user/feed API
 - Explore the $nin, $and, $ne and other query methods
 - 
 - 
 - 





































