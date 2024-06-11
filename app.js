const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const logger = require('morgan');
const mongoose = require('mongoose');
const checkAuth  = require('./src/middleware/auth');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./swagger');
const cors = require('cors');
const configMensage = require('./nodemailer');

var dashboardRouter = require('./src/routes/dashboard');
var loginRouter = require('./src/routes/login');
var entityRouter = require('./src/routes/entities');
var donorRouter = require('./src/routes/donors');
var donationRouter = require('./src/routes/donations');
var adminRouter=require('./src/routes/admins')
var logoutRouter=require('./src/routes/logout')

var app = express();
app.use(cors());

app.use(session({
  secret:"sessao",
  resave:false,
  saveUninitialized:false,
}))


mongoose.Promise = global.Promise;
//connection to dataBase
mongoose.connect('mongodb+srv://paw24:MzGoBjFDQ9D3BQ7h@cluster0.49yetzm.mongodb.net/reciclaDB?retryWrites=true&w=majority')

.then(() => console.log('Conexão com MongoDB estabelecida com sucesso!'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));



// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs',checkAuth,swaggerUi.serve, swaggerUi.setup(specs));
app.use('/dashboard', dashboardRouter);
app.use('/', loginRouter);
app.use('/entities', entityRouter);
app.use('/donors', donorRouter);
app.use('/donations', donationRouter);
app.use('/login',loginRouter);
app.use('/', loginRouter);
app.use('/admins', adminRouter);
app.use('/logout',logoutRouter);


// Admin Dashboard Route
//app.get('/admin/dashboard', adminAuth, (req, res) => {
    // Route handler logic here
   // res.send('Admin Dashboard');
//});

// Admin Login Form Route
//app.get('/admin/login', adminControllers.admin_login_get);

// catch 404 and forward to error handler
app.get(function (req, res, next) {
  next(createError(404));
});
app.post('/formulario', (req, res) => {
  configMensage(req.body);
  res.status(200).send();
 })
// error handler
app.use(function (err, req, res, next) {
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
