const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = 3000
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(cors());

console.log(process.env.MONGO_URI)

mongoose.connect('mongodb://localhost:27017/tasks-manager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  
  const taskSchema = new mongoose.Schema({
      title: String,
      description: String,
      status: String,
      priority: String,
      assignedTo: String, 
      dueDate: String
    });
    
  const tasks = mongoose.model('tasks', taskSchema);

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
  });
  
const users = mongoose.model('users', userSchema);

app.get('/', async(req, res) => {
  const sendTask = await tasks.find();
  res.send(sendTask);
})

app.post('/add', async (req, res) => {
    try{
        const data = req.body;
        const task = new tasks(data); // Create a new instance of the task model
        const result = await task.save(); // Save the task to the database
        res.send({success: true, result: result})
    } catch(err){
        res.send(err)
    }
  })

  app.put('/update/:id', async (req, res) => {
    try {
      const updatedTask = await tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send({ success: true, result: updatedTask });
    } catch (err) {
      res.status(500).send({ success: false, error: 'Error updating task' });
    }
  });

  app.delete('/delete', async (req, res) => {
    try{const data = req.body;
    const task = await tasks.deleteOne(data);
    res.send({success:true , result : task})
    } catch(err){
      console.log(err)
      res.send(err)
    }
  })


  app.get('/task/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await tasks.findById(taskId);
      if (!task) {
        return res.status(404).send({ success: false, message: 'Task not found' });
      }
      res.send(task);
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, error: err.message });
    }
  });


  app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ success: false, message: 'User already exists' });
      }
  
      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create new user
      const newUser = new users({
        name,
        email,
        password: hashedPassword,  // Save hashed password
        isAdmin: false
      });
  
      await newUser.save();
      res.status(201).send({ success: true, message: 'User registered successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Error registering user' });
    }
  });

  app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).send({ success: false, message: 'User not found' });
      }
  

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ success: false, message: 'Incorrect password' });
      }
  
      res.send({ success: true, user: { name: user.name, email: user.email } });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Server error' });
    }
  });
  

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})