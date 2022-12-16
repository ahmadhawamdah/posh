import express from 'express'
import controller from '../controllers/Event'

const router = express.Router();

router.get('/v1/events', controller.readEvents);
router.get('/v1/events/:eventId', controller.readEvent);
router.get('/v1/event/location', controller.readEventsWithFilters);
// router.get('/v1/events/c/:popular/t/:time/p/:pagenum/city/:cityName', controller.readEventsWithFilters);

export default router;