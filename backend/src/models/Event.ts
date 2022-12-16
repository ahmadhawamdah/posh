import mongoose, {Document, Schema} from "mongoose";

export interface IEvent {
    name: string;
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema({
    _id: {type: String},
    name: {type: String, required: true},
    flyer: {type: String, required: false},
    groupAvi: {type: String, required: false},
    timezone: {type: String, required: false},
    startUtc: {type: String, required: false},
    venueName: {type: String, required: false},
    groupName: {type: String, required: false},
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
        
      }
});

EventSchema.index({ location: "2dsphere" }); 

export default mongoose.model<IEventModel>('Event', EventSchema);

// Interface Event {
//     name: string
//       flyer: string,
//       groupAvi: string
//       timezone: string
//       startUtc: Date
//       endUtc: Date
//       url: string
//       venueName: string
//       groupName: string
//       location: GeoJSON Point