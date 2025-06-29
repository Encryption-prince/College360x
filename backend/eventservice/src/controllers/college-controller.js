const {CollegeService} =require('../services/index');

const collegeService = new CollegeService();

const create =async (req,res)=>{
    try {
        const college = await collegeService.create(req.body);
        return res.status(201).json({
            data: college,
            success:true,
            message: 'succesfully created a college',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create a college',
            err: error
        });
    }
}

const destroy = async (req,res)=>{
    try {
        const response = await collegeService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success:true,
            message: 'succesfully deleted the college',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to delete the college',
            err: error
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await collegeService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a college',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get the college',
            err: error
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await collegeService.update(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a college',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the college',
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const colleges = await collegeService.getAllColleges(req.query);
        return res.status(200).json({
            data: colleges,
            success: true,
            message: 'Successfully fetched all colleges',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the colleges',
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