const { Op } = require('sequelize');
const CrudRespository = require('./crud-repository');
const { Event } =require('../models/index');

class EventRepository extends CrudRespository{
    #createFilter(data){
        let filter={};
        if(data.venueId){
            filter.venueId = data.venueId;
        }
        if(data.clubId){
            filter.clubId = data.clubId;
        }
        if(data.permission){
            filter.permission = data.permission;
        }
        if(data.price){
            filter.price = data.price;
        }
        return filter;
    }

    constructor(){
        super(Event);
    }

    async getAllEvents(filter) { // filter can be empty also
        try {
            const filterObject = this.#createFilter(filter);
            const event = await Event.findAll({
                where: filterObject
            });
            return event;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}
module.exports = EventRepository;