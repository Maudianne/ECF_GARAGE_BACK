const express = require('express');

const router = express.Router();

module.exports = router;

const app = express();
const userRoutes = require('./router/user');
//app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.post('/api/stuff', (req, res, next) => {
//    console.log(req.body);
//    res.status(201).json({
//        message: 'objet crée'
//    });
//});

app.get('/api/stuff', (req, res, next) => {
    //const stuff = [
    //    {
    //        _id: '00001',
    //        title: 'Peugeot 208',
    //        kilometrage: '12000km',
    //        imageUrl: 'peugeot.jpg',
    //        price: 1254900,
    //    },
    //    {
    //        _id: '00002',
    //        title: 'Citröen C3',
    //        description: '75000km',
    //        imageUrl: 'citroen.jpg',
    //        price: 522900,
    //    },
    //];
    //res.status(200).json(stuff);

    con.query('SELECT * FROM voiture', function (err, rows) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(rows);
        }
    })
});


    

module.exports = app;