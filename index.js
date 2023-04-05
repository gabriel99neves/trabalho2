const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./router");
const multer = require("multer");
const upload = multer();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));


app.use('/', upload.any(), router);
 
 app.listen(3000, () => {
 console.log('API rodando na porta 3000!');
});