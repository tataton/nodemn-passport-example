const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const app = express();

/*----- PASSPORT & SESSION INITIALIZATION -----*/
const redisStore = require('./resources/redis/redisStore');
app.use(
  session({
    store: redisStore,
    secret: 'NodeMN is 5 years old',
    saveUninitialized: false,
    resave: false
    // name: defaults to 'connect.sid', best to rename
    // proxy: dafaults to undefined; load-balancers may require true
    // cookie: defaults to { path: '/', httpOnly: true, secure: false, maxAge: null };
    //            { secure: true } for https,
    //            { maxAge: appropriate value }
    //            { sameSite: true } protects against CSRF
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*------------------ ROUTES ------------------*/
const auth = require('./routes/auth');
app.use('/auth', auth);

const isAuthenticated = require('./lib/isAuthenticated');
app.use(
  '/private',
  isAuthenticated,
  express.static(path.join(__dirname, 'client', 'private'))
);

app.use('/public', express.static(path.join(__dirname, 'client', 'public')));

// Default routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});
app.get('*', (req, res) => {
  res.redirect('/');
});

/*------------------ SERVER ------------------*/
app.listen(PORT);
console.log(`Server listening on port ${PORT}.`);
