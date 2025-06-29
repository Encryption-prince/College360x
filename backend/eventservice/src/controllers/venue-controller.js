const {VenueService} = require('../services/index');

const venueService= new VenueService();

const create =async (req,res)=>{
    try {
        const venue = await venueService.create(req.body);
        return res.status(201).json({
            data: venue,
            success:true,
            message: 'succesfully created a venue',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create a venue',
            err: error
        });
    }
}
const destroy = async (req,res)=>{
    try {
        const response = await venueService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success:true,
            message: 'succesfully deleted the venue',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to delete the venue',
            err: error
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await venueService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a venue',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get the venue',
            err: error
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await venueService.update(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a venue',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the venue',
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const venues = await venueService.getAllVenues(req.query);
        return res.status(200).json({
            data: venues,
            success: true,
            message: 'Successfully fetched all venues',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the venues',
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