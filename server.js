import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(cors());

const { apiKey, PORT } = process.env;

const port = PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/news/us', async (req, res) => {
  const response = await fetch("https://newsdata.io/api/1/news?country=us&size=1", {
    method: "GET",
    headers: {
      "X-ACCESS-KEY": apiKey,
      "Access-Control-Allow-Origin": "*"
    }
  }).then(response => {
    return response.json();
  });

  res.json(response);
});

app.get('/news/global', async (req, res) => {
  const response = await fetch("https://newsdata.io/api/1/news?language=en&size=1", {
    method: "GET",
    headers: {
      "X-ACCESS-KEY": apiKey,
      "Access-Control-Allow-Origin": "*"
    }
  }).then(response => {
    return response.json();
  });

  res.json(response);
});

app.listen(port, () => {
  console.log(`App listening on Port ${port}`);
});