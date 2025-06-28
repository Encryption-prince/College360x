const {response} = require('express');
const RoleService = require("../services/role-service");

const roleService = new RoleService();

const create = async (req,res)=>{
    try{
        const response = await roleService.create({
            name: req.body.name
        });
        return res.status(201).json({
            success:true,
            message:'Successfully created a new role',
            data: response,
            err: {}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success : false,
            err: error
        });
    }
}



module.exports ={
    create,
}