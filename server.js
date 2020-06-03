const express = require("express");
const connectDB =require('./config/db');
const app = express();

connectDB();

//Init Middleware
app.use(express.json({ extended: false}));

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/resume', require('./routes/api/resume'));
app.use('/api/listing', require('./routes/api/listing'));
app.use('/api/radar/', require('./routes/api/radar'));
app.use('/api/status/', require('./routes/api/status'));
app.use('/api/form', require('./routes/api/form'));

app.get('/', (req,res) => res.send('API Running'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});