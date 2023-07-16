const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./apiRoutes');
const routes = require('./htmlRoutes');
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', routes);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}.`);
});