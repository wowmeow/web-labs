import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;
const _dirname = path.resolve();
const Parser = bodyParser.urlencoded({
    extended: false
});
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "web_labs",
    password: "root"
});

app.use(express.static(path.join(_dirname, '/public')));
app.use(bodyParser.json());
app.set("view engine", "hbs");
hbs.registerPartials(_dirname + "index.hbs");

app.get('/', (req, res) => {
    res.render('index.hbs',{
        count: 200
    });
});
// app.get("/count", Parser, (req, res) =>{
//     connection.query("SELECT COUNT(*) as count FROM person", function (err, results, fields) {
//         let count_person = JSON.stringify(results[0].count);
//         res.send(count_person);
//         // число записей
//     });
// });

app.post('/registr', Parser, (req, res) => {
    connection.query("SELECT COUNT(*) as count FROM person", function (err, results, fields) {
        let count_users = results[0].count;
        // число записей
        connection.query("INSERT INTO person VALUES(?, ?, ?)", [count_users++, req.body.Name, req.body.Phone, ], function (err, results) {
            if (err) console.error(err);
            else {
                res.redirect('/');
                console.log("Данные добавлены");
            }
        });
    });
});
const app2 = express();

app2.get('/', (req, res) => {
    res.send('This second server');
});
app2.get("/count", Parser, (req, res) => {
    connection.query("SELECT COUNT(*) as count FROM person", function (err, results, fields) {
        let count_person = JSON.stringify(results[0].count);
        res.send(count_person);
        // число записей
    });
});

const jsonPlaceholderProxy = createProxyMiddleware({
    target: ' http://localhost:4000',
    changeOrigin: true,
    logLevel: 'debug',
});

app.use('/', jsonPlaceholderProxy);
app.use('/count', jsonPlaceholderProxy);



app2.listen(4000, () => {
    console.log(`Server start! PORT : 4000...`);
});


app.listen(PORT, () => {
    console.log(`Server start! PORT : ${PORT}...`);
});