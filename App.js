import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js'; // Ensure this path is correct

const app = express();

Hello(app);
Lab5(app);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
