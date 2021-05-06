const express = require("express");
var bodyParser = require("body-parser");
const { json } = require("body-parser");

const userRouters = require('./routes/userRouters');
const scrapRouters = require('./routes/scrapRouters');
const orderRouters = require('./routes/orderRouters');
const userTypeRouters = require('./routes/userTypeRouters');
const scrapOrderRouters = require('./routes/scrapOrderRouters');

const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT,()=>console.log(`Server is listening at port ${PORT}...`));

// middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use(userRouters);
app.use(scrapRouters);
app.use(orderRouters);
app.use(userTypeRouters);
app.use(scrapOrderRouters);

