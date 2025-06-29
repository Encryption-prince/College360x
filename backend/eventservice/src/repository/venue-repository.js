const { Op } = require('sequelize');
const CrudRespository = require('./crud-repository');
const { Venue } =require('../models/index');

class VenueRepository extends CrudRespository{
    constructor(){
        super(Venue);
    }

    async getAllVenues(filter) { // filter can be empty also
        try {
            if(filter.name) {
                const venues = await Venue.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return venues;
            }
            const venues = await Venue.findAll();
            return venues;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = VenueRepository;