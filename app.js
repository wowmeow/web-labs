import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import bcrypt from 'bcrypt';
const app = express();
const PORT = 3000;
const _dirname = path.resolve();
const Parser = bodyParser.urlencoded({
    extended: false
});
app.use(express.static(path.join(_dirname, '/public')));
app.use(bodyParser.json());
app.set("view engine", "hbs");
hbs.registerPartials(_dirname + "index.hbs");

app.get('/', (req, res) => {
    res.render('index.hbs');
});


app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}...`);
});