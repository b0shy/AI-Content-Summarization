require('dotenv').config();
const express = require('express');
const cors = require('cors');
const summarizeRoutes = require('./routes/summarize');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', summarizeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (req, res) => {
  res.json({ status: 'API is up and running!' });
});

app.listen(PORT, () => {
  console.log(`Smart Summary API is running at http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
