const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT || 3333, () => console.log('Servidor rodando na porta: ' + process.env.PORT || 3333))