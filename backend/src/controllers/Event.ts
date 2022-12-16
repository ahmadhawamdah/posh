import { NextFunction, Request, Response } from 'express';
import Event from '../models/Event';

const readEvents = (req: Request, res: Response, next: NextFunction) => {
  return Event.find()
    .then((events) => res.status(200).json({ events }))
    .catch((error) => res.status(500).json({ error }));
};
const readEvent = (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;
  return Event.findById(eventId)
    .then((events) => res.status(200).json({ events }))
    .catch((error) => res.status(500).json({ error }));
};


// This needs a 2d sphere index for it to work, 
// bit I am not authorized to do any CREATE/UPDATE 
// operations to the current database
const readEventsWithFilters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    // 40.7128° N, 74.0060° W
  // [-80.191788, 25.761681],
  const long = -80.191788;
  const latt = 25.761681;
  return Event.find( {

      location:
        { $near:
           {
             $geometry: { type: "Point",  coordinates: [ 0,
             0] },
             $maxDistance: 10000,
             $minDistance: 10000,
           }
          }
   })
    .then((events) => res.status(200).json({ events }))
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error })});
};

export default { readEvents, readEvent, readEventsWithFilters };


// await axios.get(`/v1/events/c/popular/t/${fetchByTime}/p/1/city/${fetchByLocation}`).then((res) => {