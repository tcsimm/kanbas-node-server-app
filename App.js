import express from 'express';
import cors from 'cors'; // Import CORS middleware
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';

const app = express();

// Use CORS middleware
app.use(cors());

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on port 4000');
});
