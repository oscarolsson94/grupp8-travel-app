import mongoose from "mongoose";

const TripPlanSchema = new mongoose.Schema(
  {
    toLocation: { type: String, required: true },
    fromLocation: { type: String, required: true },
    departureTimeAndDate: { type: String, required: true },
    arrivalTimeAndDate: { type: String, required: true },
    stops: [
      {
        location: { type: String, required: true },
        arrivalTime: { type: String, required: true },
        departureTime: { type: String, required: true },
      }, 
    ],
  }
);

const TripPlan = mongoose.model("TripPlan", TripPlanSchema);

export default TripPlan;
