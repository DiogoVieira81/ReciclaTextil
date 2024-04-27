const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const multer = require('multer'); 
const fs = require('fs');

const Admin = require('./src/models/Admin');
const Entity = require('./src/models/Entity'); 

var adminControllers = require('./src/controllers/adminControllers');
//var adminAuth = require('./src/middleware/adminAuth');

var indexRouter = require('./src/routes/dashboard');
//var loginRouter = require('./src/routes/login');
var entityRouter = require('./src/routes/entities');
var donorRouter = require('./src/routes/donors');

var app = express();

mongoose.Promise = global.Promise;
//connection to dataBase
mongoose.connect('mongodb+srv://paw24:MzGoBjFDQ9D3BQ7h@cluster0.49yetzm.mongodb.net/reciclaDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexão com MongoDB estabelecida com sucesso!'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));



// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

passport.use('admin-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      bcrypt.compare(password, admin.password, (err, result) => {
        if (err) {
          return done(err);
        }
        if (result) {
          return done(null, admin);
        } else {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
      });
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, admin) => {
    done(err, admin);
  });
});
// Multer configuration for upload imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
//app.use('/login', loginRouter);
app.use('/entities', entityRouter);
app.use('/donors', donorRouter);
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

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
