var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, user) => {
    done(err, user);
  });
});


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/entities', entityRouter);
app.use('/donors', donorRouter);

app.get('/admin/dashboard', adminAuth, admin_controller.admin_dashboard_get);

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
