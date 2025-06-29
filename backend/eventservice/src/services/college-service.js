const CrudService = require('./crud-service');
const {CollegeRepository} =require('../repository/index');
const collegeRepository = new CollegeRepository();
class CollegeService extends CrudService{
    constructor(){
        super(collegeRepository);
    }

    async getAllColleges(filter) {
        try {
            const colleges = await collegeRepository.getAllColleges({name: filter.name});
            return colleges;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

}

module.exports = CollegeService;