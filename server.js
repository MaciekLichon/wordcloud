const express = require('express');
const cors = require('cors');

const db = require('./db');
const questionsRoutes = require('./routes/questions.routes');

const app = express();

/* MIDDLEWARE */
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cors());

/* ENDPOINTS */
app.use('/api', questionsRoutes);

/* MIDDLEWARE */
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' })
})

/* SERVER PORT */
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
})
