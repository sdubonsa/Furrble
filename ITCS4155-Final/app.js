const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// SET UP SERVER
const app = express()
const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
