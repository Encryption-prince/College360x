const express = require('express');
const bodyParser = require('body-parser');

const {PORT} =require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');
const {User,Role} = require('./models/index');
const app = express();
const cors = require("cors");

app.use(cors());

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded.apply({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async()=>{
        console.log(`Server Started on Port : ${PORT}`);
        // if(process.env.DB_SYNC) {
        //     db.sequelize.sync({alter: true});
        // }
        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(1);
        //u1.addRole(r1);
    });
}

prepareAndStartServer();