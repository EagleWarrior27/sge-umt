const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const principalRouter = require('./routes/principalRoute');
const becarioRouter = require('./routes/becarioRoute');
const alumnoRouter = require('./routes/alumnoRoute');
const equipoRouter = require('./routes/equipoRoute');
const prestamoRouter = require('./routes/prestamoRoute');

const app = express();
app.use(expressSession({
  secret: "Shhh, It's a secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(userLoggedMiddleware);

app.use('/', principalRouter);
app.use('/becarios', becarioRouter);
app.use('/alumnos', alumnoRouter);
app.use('/equipos', equipoRouter);
app.use('/prestamos', prestamoRouter);

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

module.exports = app;
