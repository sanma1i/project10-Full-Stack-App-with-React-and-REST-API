'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const courses = require('./routes/courses');
const users = require('./routes/users');
const main = require('./routes/main');
const app = express();
//const Sequelize = require('sequelize');
const sequelize = require('./models').sequelize;
//const bodyParser = require('body-parser')


//Set request body JSON parsing
app.use(express.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//Setup API routes
app.use('/api', users);
app.use('/api', courses);
app.use('/api', main);

//Redirect to API route
// app.get('/', (req, res) => res.redirect('/api'));


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
//Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
    return sequelize.sync();
  })

  .catch(err => {
    console.error('Unable to connect to the database:",err')
  });