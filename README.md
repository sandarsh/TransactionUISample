# TransactionUISample

#### Visit https://transaction-ui.herokuapp.com/ to see the app deployed

### Tools Used:
* AngularJS 1.6.5
* Bootstrap 3.3.7 - Styling Template
* JQuery 3.3.1
* ExpressJS - Express Server
* NodeJS - Javascript runtime
* ESLINT - Style guide (extends Airbnb-base configuration)
* dotenv - to easily load environment variables from .env file


### Design
This application follows a Service Oriented Architecture. The application resides in the 'app' folder.  
The public folder consists of all the files that are served from this web server
* There is no database connectivity for now and new transactions are stored in the web server locally. 
* When a transaction is initiated, there is a 3 second timeout on the backend which simulates payment processing during which time, a loader shows on the front end.

The services folder consists of the router and logger services on the root level and then contains other folders for various services.
* The router.js file indicates where routes to other services can be added.
* The logger service exports the logger object which can be used by other services to generate logs.

The services folder has only one service now called 'payment' which contains the backend implementation for the assignment.

The public folder is also segregated broadly based on services:
* assets - contains all the js dependencies, css and image files.
* controllers - contains controllers for different views
* views - contains the various views that we have created for the application
* app.js - Initiazilizes the angular application and performs dependency injection
* router.js - The main router file for AngularJS
* index.html - The main index file for our AngularJS SPA.

### Future Enhancements
This section mentions further enhancement that can be made to improve this service:
* User management
    * Authentication, authorization and session management.
    * Some UI fine tuning
    * Testing the application

### Running on Local Environment
#### Requirements:
* Node.js
#### Instructions
* Create a .env file in the root directory (the directory that contains 'server.js')
* Edit the .env file to have the following environment variables:  
    * NODE_HOST=127.0.0.1
    * NODE_PORT=3000   (or the port number you want to run locally on)
* Run 'npm install' to install all dependencies
* Run 'npm start' to run the app locally
