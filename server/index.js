const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const animalsRouter = require('./routes/animals');
app.use('/api/animals', animalsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
