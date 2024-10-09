var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MySQLStore = require('express-mysql-session')(session);

const options = {
	host: process.env.DATABASE_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	createDatabaseTable: false,
	schema: {
    		tableName: 'sessions',
    		columnNames: {
    			session_id: 'session_id',
    			expires: 'expires',
    			data: 'data'
    		}
    	}
};

const sessionStore = new MySQLStore(options);

const bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    key: 'sessionIdCookie',
    secret: 'thisshouldbeasecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
