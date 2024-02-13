import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const { apiKey, PORT } = process.env;

const port = PORT || 5000;

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

app.get('/news/local', (req, res) => {

});

app.listen(port, () => {
  console.log(`App listening on Port ${port}`);
});