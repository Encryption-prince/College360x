const {EventService} = require('../services/index');

const eventService= new EventService();

const create =async (req,res)=>{
    try {
        const event = await eventService.create(req.body);
        return res.status(201).json({
            data: event,
            success:true,
            message: 'succesfully created a event',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create a event',
            err: error
        });
    }
}

const destroy = async (req,res)=>{
    try {
        const response = await eventService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success:true,
            message: 'succesfully deleted the event',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to delete the event',
            err: error
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await eventService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a event',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get the event',
            err: error
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await eventService.update(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a event',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the event',
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const events = await eventService.getAllEvents(req.query);
        return res.status(200).json({
            data: events,
            success: true,
            message: 'Successfully fetched all events',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the events',
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