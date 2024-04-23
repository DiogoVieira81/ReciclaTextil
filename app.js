var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

var indexRouter = require('./src/routes/index');
var loginRouter = require('./src/routes/login');
var entityRouter = require('./src/routes/entities');
var donorRouter = require('./src/routes/donors');

var app = express();

//connection to dataBase
mongoose.connect('mongodb+srv://paw24:MzGoBjFDQ9D3BQ7h@cluster0.49yetzm.mongodb.net/reciclaDB?retryWrites=true&w=majority')
.then(() => console.log('Conexão com MongoDB estabelecida com sucesso!'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/entities', entityRouter);
app.use('/donors', donorRouter);

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

const port = 3000;

app.listen(port);

module.exports = app;
