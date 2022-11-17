const express = require('express');
const path = require("path");
const multer = require("multer");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.port || 8000;
const app = express();
const run = require('./Controllers/dbfaker')
const fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

app.use('/api/dbfaker', run)
app.use('/api/employers', require('./Routes/employer_route'))
app.use('/api/freelancers', require('./Routes/freelancer_route'))
app.use('/api/admins', require('./Routes/admin_route'))
app.use('/api/login', require('./Routes/login_route'))
app.use('/api/projects', require('./Routes/project_route'))
app.use('/api/payment', require('./Routes/payment_route'))
app.use('/api/dashboards', require('./Routes/dashboard_route'))
app.use('/api/chats', require('./Routes/chat_route'))
app.use('/api/charts', require('./Routes/admin_chart'))
app.use('/images/*',
    (req, res) => {
        console.log(__dirname)
        // fs.readFile(req.params.path,(err,data)=>{
        //     if(err) res.sendStatus(500);
        //     res.set({
        //         'Content-Type':'image/jpg'
        //     })
        //     res.sendStatus(200);
        //     res.send(data);
        // })
        res.sendFile(path.join(__dirname, req.params["0"]));
        
    })
app.listen(port, () => console.log("Server started"))