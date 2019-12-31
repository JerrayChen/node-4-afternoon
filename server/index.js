require('dotenv').config();
const express = require('express');
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;

const session = require('express-session');

// middlewares


// middlewares - json
app.use(express.json());
// middlewares - sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// middlewares - auth
const cfs = require('./middlewares/checkForSession');
app.use(cfs.checkForSession);

app.use(express.static(`${__dirname}/../build`));

// endpoints
const ac = require('./controllers/authController');
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);


const swagC = require('./controllers/swagController');
app.get('/api/swag', swagC.read);

const cc = require('./controllers/cartController');
app.post('/api/cart/checkout', cc.checkout);
app.post('/api/cart/:id', cc.add);
app.delete('/api/cart/:id', cc.delete);

const searchC = require('./controllers/searchController');
app.get('/api/search', searchC.search);


app.listen(SERVER_PORT, ()=>console.log('Server is listening to port', SERVER_PORT));
