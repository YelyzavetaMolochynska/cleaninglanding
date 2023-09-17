const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  console.log('POST-запит на / отриманий');
  res.send('POST-запит успішно оброблено');
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
