const CrudService = require('./crud-service');
const { compareTime }= require('../utils/helper');
const { EventRepository }= require('../repository/index');
const eventRepository =new EventRepository();

class EventService extends CrudService{
    constructor(){
        super(eventRepository);
    }
    async create(data){
        try {
            if(!compareTime(data.endingTime,data.startingTime)){
                throw {error : "starting time can not be less than ending time"};
            }
            const event = await eventRepository.create(data);
            return event;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
    async getAllEvents(filter) {
        try {
            const events = await eventRepository.getAllEvents(filter);
            return events;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
}

module.exports = EventService;