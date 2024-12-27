const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbConfig');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});