import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:5173' }));

const db = mysql.createConnection({
  host: 'thresholds-test.mysql.database.azure.com',
  user: 'test', 
  port: 3306, 
  password: 'test', 
  database: 'thresholds', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// routes
app.get('/', (req, res) => {
    res.send("hello!!!!");
  });


//Beam me up scotty
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });