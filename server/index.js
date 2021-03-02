/* eslint-disable no-console */
const express = require('express');
const outbound = require('./outbound');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('nice');
});

app.get('/product/:id', (req, res) => {
  const id = req.params.id;
  let data = [];
  outbound
    .fetchItemById(id)
    .then((response) => {
      data.push(response.data);
    })
    .catch((error) => {
      data.push('failed to pull item data');
    })
    .then(() => {
      return outbound.reviewInfoFetch(id);
    })
    .then((response) => {
      data.push(response.data);
    })
    .catch((error) => {
      data.push('failed to pull reviews');
    })
    .then(() => {
      return outbound.fetchStyles(id);
    })
    .then((response) => {
      data.push(response.data);
    })
    .catch((error) => {
      data.push('failed to pull styles');
    })
    .then(() => {
      res.send(data);
    });
});

app.get('/reviewsList/:id', (req, res) => {
  const id = req.params.id;
  outbound
    .allReviewFetch(id)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/qa/questions/:id', (req, res) => {
  const id = req.params.id;
  outbound
    .fetchQuestions(id)
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  let id = req.params.product_id;
  outbound
    .fetchRelated(id)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is live and happenin on ${port}`);
});
