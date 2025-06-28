const {Role} = require('../models/index');
//const user = require('../models/user');

class RoleRepository {
    async create(data){
        try {
            const role = await Role.create(data);
            return role;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(roleId){
        try {
            await Role.destroy({
                where:{
                    id:roleId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

}

module.exports = RoleRepository;