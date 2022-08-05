const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.port || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
connectDB();
app.use('/api/employers', require('./Routes/employer_route'))
app.use('/api/freelancers', require('./Routes/freelancer_route'))
app.use('/api/admins', require('./Routes/admin_route'))
app.use('/api/login', require('./Routes/login_route'))
app.listen(port,() => console.log("Server started"))