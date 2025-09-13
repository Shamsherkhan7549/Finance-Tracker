const express = require('express');
const contectDb = require('./configue/db.js');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/transactionRoutes.js');

dotenv.config();

const app = express();
const port = process.env.PORT||8080;

//Middleware
app.use(cors());
app.use(express.json());

// db connection
contectDb();

app.get('/', (req, res) => {
    res.send('api working...');
});

//Middleware
app.use('/', router);


app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
