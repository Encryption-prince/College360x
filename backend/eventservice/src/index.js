const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index'); 

const setupAndStartServer = async()=>{

    const app=express();

    // CORS configuration
    const corsOptions = {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'], // Add your frontend URLs
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true, // Allow cookies and authentication headers
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',ApiRoutes);

    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`);
    });

}

setupAndStartServer();