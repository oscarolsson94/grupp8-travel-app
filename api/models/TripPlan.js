import mongoose from "mongoose";

const TripPlanSchema = new mongoose.Schema(
  {
    toLocation: { type: String, required: true },
    fromLocation: { type: String, required: true },
    departureTimeAndDate: { type: Date, required: true },
    arrivalTimeAndDate: { type: Date, required: true },
    stops: [
      {
        location: { type: String, required: true },
        arrivalTime: { type: Date, required: true },
        departureTime: { type: Date, required: true },
      }, 
    ],
  }
);

const TripPlan = mongoose.model("TripPlan", TripPlanSchema);

export default TripPlan;
