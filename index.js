require('dotenv').config();
const express = require('express');
const path = require('path');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const { PORT } = process.env || 3000;
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

app.use(errorHandler);

app.listen(PORT, console.log(`ouvindo na port ${PORT}`));
