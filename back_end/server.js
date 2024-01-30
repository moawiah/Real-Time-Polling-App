const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

app.listen(port, () => {
    console.log('listening on port ' + port);
});