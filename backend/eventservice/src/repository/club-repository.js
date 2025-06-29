const { Op } = require('sequelize');
const CrudRespository = require('./crud-repository');
const {Club}=require('../models/index');

class ClubRepository extends CrudRespository{
    constructor(){
        super(Club);
    }

    async getAllClubs(filter) { // filter can be empty also
        try {
            if(filter.name) {
                const clubs = await Club.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return clubs;
            }
            const clubs = await Club.findAll();
            return clubs;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = ClubRepository;