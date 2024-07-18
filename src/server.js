const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

app.use(cors());

let windowPrevState = [];
let windowCurrState = [];

const getNumbers = async (type) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${type}`, { timeout: TIMEOUT });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
};

const updateWindowState = (newNumbers) => {
  windowPrevState = [...windowCurrState];
  newNumbers.forEach((num) => {
    if (!windowCurrState.includes(num)) {
      windowCurrState.push(num);
    }
  });
  if (windowCurrState.length > WINDOW_SIZE) {
    windowCurrState = windowCurrState.slice(-WINDOW_SIZE);
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['primes', 'fibo', 'even', 'rand'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  const newNumbers = await getNumbers(type);
  updateWindowState(newNumbers);

  const avg = calculateAverage(windowCurrState);

  res.json({
    windowPrevState,
    windowCurrState,
    numbers: newNumbers,
    avg: avg.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
