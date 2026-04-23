const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/sensor', require('./routes/sensor.routes'));
app.use('/api/comentarios', require('./routes/comentarios.routes'));

module.exports = app;
