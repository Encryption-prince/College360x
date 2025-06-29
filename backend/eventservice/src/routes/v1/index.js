const express =require('express');
const VenueController = require('../../controllers/venue-controller');
const ClubController = require('../../controllers/club-controller');
const EventController =require('../../controllers/event-controller');
const CollegeController = require('../../controllers/college-controller');

const router = express.Router();
router.post('/venue',VenueController.create);
router.delete('/venue/:id',VenueController.destroy);
router.patch('/venue/:id',VenueController.update);
router.get('/venue/:id',VenueController.get);
router.get('/venue',VenueController.getAll);

router.post('/club',ClubController.create);
router.delete('/club/:id',ClubController.destroy);
router.patch('/club/:id',ClubController.update);
router.get('/club/:id',ClubController.get);
router.get('/club',ClubController.getAll);

router.post('/college',CollegeController.create);
router.delete('/college/:id',CollegeController.destroy);
router.patch('/college/:id',CollegeController.update);
router.get('/college/:id',CollegeController.get);
router.get('/college',CollegeController.getAll);

router.post('/event',EventController.create);
router.delete('/event/:id',EventController.destroy);
router.patch('/event/:id',EventController.update);
router.get('/event/:id',EventController.get);
router.get('/event',EventController.getAll);
// router.get('/city/:id',CityController.get);
// router.patch('/city/:id',CityController.update);

module.exports = router;