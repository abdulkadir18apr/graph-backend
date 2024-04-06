// Import the required modules

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { initializeDatabase } = require("./db/db.connection");
const auth=require("./routes/auth.router")
const data=require("./routes/data-router")


const port = process.env.PORT || 3000; 


app.use(express.json());

app.use(cors());





initializeDatabase();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/auth',auth);
app.use('/api/data',data)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


