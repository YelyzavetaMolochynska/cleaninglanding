const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Додайте модуль 'path' для роботи з шляхами

const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Додаємо статичний каталог для файлів, які містяться в проекті
app.use(express.static(path.join(__dirname, 'public'))); // 'public' - це каталог, де міститься ваш 'index.html'

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Відправляємо 'index.html' як відповідь
});

app.post('/', (req, res) => {
  console.log('POST-запит на / отриманий');
  res.send('POST-запит успішно оброблено');
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
