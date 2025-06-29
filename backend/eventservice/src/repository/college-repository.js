const { Op } = require('sequelize');
const CrudRespository = require('./crud-repository');
const {College}=require('../models/index');

class CollegeRepository extends CrudRespository{
    constructor(){
        super(College);
    }

    async getAllColleges(filter) { // filter can be empty also
        try {
            if(filter.name) {
                const colleges = await College.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return colleges;
            }
            const colleges = await College.findAll();
            return colleges;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = CollegeRepository;