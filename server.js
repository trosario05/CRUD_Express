import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT;
app.use(cors({ origin: 'http://localhost:5173' }));


const db = mysql.createConnection({
  host: 'thresholds-test.mysql.database.azure.com',
  user: 'trosario',
  port: 3306, 
  password: 'test', 
  database: 'trosario_tasks', 
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Test Route :)
app.get('/', (req, res) => {
    res.send("hello!!!!");
  });

//Getting Tasks from Database
  app.get('/tasks', (req, res) => {

//writing the query
    const query = 'SELECT * FROM tasks';

// establishing the connection
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving tasks:', err);
        res.status(500).json({ error: 'Error retrieving tasks' });
      } else {
        console.log(typeof (results));
        res.json(results);
      }
    });
  });

  //Inserting new info. into table
  app.post('/tasks', (req, res) => {
    const params = [req.body['title'], req.body['description'], req.body['is_completed']];
    const query = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?);";
  
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error inserting task:', err);
        res.status(500).json({ error: 'Error adding task to database' });
      } else {
        res.status(201).json({ message: "Task added successfully", taskId: results.insertId });
      }
    });
  });

//Beam me up scotty
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });