const http = require('http');
var mysql = require('mysql2');
const express = require('express');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Maudianne94",
    database: "garage_parrot"

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

const app = express();
const userRoutes = require('./router/user');
//app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use(express.json());

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.set('views', './views')
app.set('view engine', 'pug')

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

app.post('/api/stuff', (req, res, next) => {
    let query = "INSERT INTO voiture (modele, prix, annee, km, photo) VALUES ('" + req.body.modele + "', " + req.body.prix + "," + req.body.annee + ", " + req.body.km + ",'" + req.body.photo + "');";
    console.log(query);
    con.query(query, function (err, rows) {
        if (err) {
           res.render('index', { title: 'error', message: JSON.stringify(err) })
        } else {
            res.render('index', { title: 'success', message:  "Insert success" })
        }
    })
});

app.get('/api/stuff', (req, res, next) => {

    con.query('SELECT * FROM voiture', function (err, rows) {
        if (err) {
            req.flash('error', err)
            res.render('profile', { data: '' })
        } else {
            res.render('index', { title: 'voiture', message: JSON.stringify(rows) })
        }
    })
});

server.listen(process.env.PORT || 3000);
