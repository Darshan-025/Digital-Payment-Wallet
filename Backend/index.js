const express = require('express');
const { PORT } = require('./config');
const app = express();
const port = PORT;
const cors = require('cors');
const mainroute = require('./Routes/index');

app.use(cors());

app.use(express.json());

app.use('/trynew', mainroute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`) 
});


