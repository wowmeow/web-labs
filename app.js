// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser');
// const hbs = require('hbs');
// const Person = require ('./models/person');

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import Person from  './models/person';

const app = express();
const PORT = 7000;
const saltRounds = 10;
const _dirname = path.resolve();
const Parser = bodyParser.urlencoded({
    extended: false
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

app.get("/count", Parser, (req, res) =>{
    Person.find({},(err, result)=>{
        if(err) console.log(err)
        else {
            res.send(JSON.stringify(result.length))
        }
    }) 
});

app.post('/registr', Parser, (req, res) => {
        const person = new Person({
            name: req.body.Name,
            phone: req.body.Phone
        })
        person.save();
        res.redirect('/');
});
// const app2 = express();

// app2.get('/', (req, res) => {
//     res.send('This second server');
// });
// app2.get("/count", Parser, (req, res) => {
//     connection.query("SELECT COUNT(*) as count FROM person", function (err, results, fields) {
//         let count_person = JSON.stringify(results[0].count);
//         res.send(count_person);
//         // число записей
//     });
// });

// const jsonPlaceholderProxy = createProxyMiddleware({
//     target: ' http://localhost:4000',
//     changeOrigin: true,
//     logLevel: 'debug',
// });

// app.use('/', jsonPlaceholderProxy);
// app.use('/count', jsonPlaceholderProxy);



// app2.listen(4000, () => {
//     console.log(`Server start! PORT : 4000...`);
// });

async function start() {
    try{
        const url = 'mongodb+srv://user:pB7yo8R84NlPjgPO@cluster0.1kobw.mongodb.net/YoGo';
        app.listen(PORT, () => {
        await mongoose.connect(url, {useNewUrlParser: true});
        console.log(`Server start! PORT : ${PORT}...`);
    });
    } catch (e) {
        app.listen(PORT, () => {
            console.log(`Server start! PORT : ${PORT}...`);
        });
    }
    
}

start();