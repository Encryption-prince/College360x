const {ClubService} =require('../services/index');

const clubService = new ClubService();

const create =async (req,res)=>{
    try {
        const club = await clubService.create(req.body);
        return res.status(201).json({
            data: club,
            success:true,
            message: 'succesfully created a club',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create a club',
            err: error
        });
    }
}

const destroy = async (req,res)=>{
    try {
        const response = await clubService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success:true,
            message: 'succesfully deleted the club',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to delete the club',
            err: error
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await clubService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a club',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get the club',
            err: error
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await clubService.update(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a club',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the club',
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const clubs = await clubService.getAllClubs(req.query);
        return res.status(200).json({
            data: clubs,
            success: true,
            message: 'Successfully fetched all clubs',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the clubs',
            err: error
        });
    }
}

module.exports={
    create,
    destroy,
    get,
    update,
    getAll
}