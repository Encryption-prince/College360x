const CrudService = require('./crud-service');
const { VenueRepository }= require('../repository/index');
const venueRepository =new VenueRepository();
class VenueService extends CrudService{
    constructor(){
        super(venueRepository);
    }

    async getAllVenues(filter) {
        try {
            const venues = await venueRepository.getAllVenues({name: filter.name});
            return venues;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

}

module.exports=VenueService;