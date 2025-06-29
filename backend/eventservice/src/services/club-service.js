const CrudService = require('./crud-service');
const {ClubRepository} =require('../repository/index');
const clubRepository = new ClubRepository();
class ClubService extends CrudService{
    constructor(){
        super(clubRepository);
    }

    async getAllClubs(filter) {
        try {
            const clubs = await clubRepository.getAllClubs({name: filter.name});
            return clubs;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

}

module.exports = ClubService;