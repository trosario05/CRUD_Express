import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.db_PORT;
app.use(cors({ origin: 'http://localhost:5173' }));


const db = mysql.createConnection({
  host: 'thresholds-test.mysql.database.azure.com',
  user: process.env.db_USERNAME,
  port: 3306, 
  password: process.env.db_PASSWORD, 
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
    const getQuery = 'SELECT * FROM tasks';

// establishing the connection
    db.query(getQuery, (err, results) => {
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
    const postQuery = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?);";
  
    db.query(postQuery, params, (err, results) => {
      if (err) {
        console.error('Error inserting task:', err);
        res.status(500).json({ error: 'Error adding task to database' });
      } else {
        res.status(201).json({ message: "Task added successfully"});
      }
    });
  });

// GET route that retrieves the task id
app.get('/tasks/:id', (req, res) => {
  const params = req.params.id;
  const getQuery = 'SELECT * FROM tasks WHERE id = ?';

  db.query(getQuery, [params], (err, results) => {
    if (err) {
      console.error('Error retrieving task:', err);
      res.status(500).json({ error: 'Error retrieving tasks' });
    } else{
      res.status(200).json(results[0]);
    }
  });
});

// PUT route to update the "is_completed" field for a task
app.put('/tasks/:id', (req, res) => {
  const params = [req.body['is_completed'], req.params.id];  
  const updateQuery = 'UPDATE tasks SET is_completed = ? WHERE id = ?';

  db.query(updateQuery, params, (err, results) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task completion status updated successfully' });
  });
});

//Delete a row with app.delete

app.delete('/tasks', (req, res) => {
  const params = [req.body['id']]; 
  const deleteQuery = 'DELETE FROM tasks WHERE id = ?';

  db.query(deleteQuery, params, (err, results) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

//Beam me up scotty
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
 