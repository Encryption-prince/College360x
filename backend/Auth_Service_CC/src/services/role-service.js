
const RoleRepository = require('../repository/role-repository');
const {JWT_KEY} = require('../config/serverConfig');

class RoleService {
    constructor(){
        this.roleRepository = new RoleRepository();
    }

    async create(data){
        try {
            const role = await this.roleRepository.create(data);
            return role;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = RoleService;