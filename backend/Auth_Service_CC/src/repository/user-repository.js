const {User,Role} = require('../models/index');
//const user = require('../models/user');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({where:{
                email:userEmail
            }});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async isTeacher(userId){
        try{
            const user = await User.findByPk(userId);
            const teacherRole = await Role.findOne({
                where:{
                    name:'teacher'
                }
            });
            return user.hasRole(teacherRole);
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async isConvenor(userId){
        try{
            const user = await User.findByPk(userId);
            const convenorRole = await Role.findOne({
                where:{
                    name:'convenor'
                }
            });
            return user.hasRole(convenorRole);
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;