var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
testAPIRouter = require('./routes/testAPI');
testAmazonRouter = require('./routes/testAmazon');
testMongoDb = require('./routes/testMongoDb')
const { log } = require('console');

var app = express();

// const products = require('./mongo-db/index');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/warehouse')

//     .then(() => console.log('connected to MongoDB ...'))
//     .catch((error) => console.error('Could not connect to MongoDB ... ',error))


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI',testAPIRouter);
app.use('/testAmazon',testAmazonRouter);
app.use('/testMongoDb',testMongoDb);

app.use(cors({
  origin : "*",
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// testAmazonRouter.get('/', (req,res) => {
    
//   products.find()

//   .then(products => res.json(products))
//   .catch(err => res.json(err))
 

// })


module.exports = app;
